import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { Locale } from '@core/enums';
import { getToken } from 'next-auth/jwt';

const rateLimit = new Map();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute;
const RATE_LIMIT_MAX_REQUESTS = 30;

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
    // Check if the request is for admin pages
    const pathname = request.nextUrl.pathname;
    const isAdminRoute = pathname.includes('/admin');

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
