import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { Locale } from '@core/enums';
import { getToken } from 'next-auth/jwt';

const rateLimit = new Map();
const maintenanceCache = { value: false, timestamp: 0 };

const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 30;
const MAINTENANCE_CACHE_TTL = 5000;

function rateLimiter(req: any) {
    const ip =
        req.ip ||
        req.headers.get('x-forwarded-for') ||
        req.connection?.remoteAddress ||
        'unknown';

    const now = Date.now();
    const requestLog = rateLimit.get(ip) || [];

    const recentRequests = requestLog.filter(
        (time: number) => now - time < RATE_LIMIT_WINDOW,
    );
    rateLimit.set(ip, [...recentRequests, now]);

    if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
        return false;
    }

    return true;
}

export default async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if (
        pathname.includes('/_next/') ||
        pathname.includes('/api/') ||
        pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf)$/)
    ) {
        return NextResponse.next();
    }

    const isAdminRoute = pathname.includes('/admin');
    const isMaintenancePage = pathname.includes('/maintenance');

    if (!isAdminRoute && !isMaintenancePage) {
        const now = Date.now();
        const isCacheValid =
            now - maintenanceCache.timestamp < MAINTENANCE_CACHE_TTL;

        let isMaintenanceMode = false;

        if (isCacheValid) {
            isMaintenanceMode = maintenanceCache.value;
        } else {
            try {
                const mainRes = await fetch(
                    `${request.nextUrl.origin}/api/admin/maintenance`,
                    {
                        method: 'GET',
                        cache: 'no-store',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                );
                if (mainRes.ok) {
                    const data = await mainRes.json();
                    isMaintenanceMode = data?.data?.maintenance || false;
                    maintenanceCache.value = isMaintenanceMode;
                    maintenanceCache.timestamp = now;
                }
            } catch {
                isMaintenanceMode = maintenanceCache.value;
            }
        }

        if (isMaintenanceMode) {
            const url = request.nextUrl.clone();
            url.pathname = '/maintenance';
            return NextResponse.redirect(url);
        }
    }

    if (isAdminRoute) {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if (!token || !(token as any).isAdmin) {
            const url = request.nextUrl.clone();
            url.pathname = '/';
            return NextResponse.redirect(url);
        }
    }

    if (!rateLimiter(request) && request.method !== 'GET') {
        return NextResponse.json(
            { success: false, message: 'Too many requests' },
            { status: 429 },
        );
    }

    const handleI18nRouting = createMiddleware({
        locales: Object.values(Locale),
        defaultLocale: Locale.EN,
        localePrefix: 'never',
        localeCookie: true,
        localeDetection: true,
    });

    return handleI18nRouting(request);
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
};
