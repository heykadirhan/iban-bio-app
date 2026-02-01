import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import UAParser from 'ua-parser-js';
import { AUTH_CONFIG } from '@/core/config';
import { connectDB } from '@/lib/db';
import { ActivityModel, UserModel } from '@/core/models';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(AUTH_CONFIG);
        const sessionUser = session?.user as
            | { _id?: string; id?: string; sub?: string }
            | undefined;
        const userId = sessionUser?._id ?? sessionUser?.id ?? sessionUser?.sub;

        if (!userId) {
            return NextResponse.json({ success: true });
        }

        const userAgent = request.headers.get('user-agent') || '';
        const parser = new UAParser(userAgent);
        const ua = parser.getResult();

        const ip =
            request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            request.headers.get('x-real-ip') ||
            request.headers.get('cf-connecting-ip') ||
            'unknown';

        const body = await request.json().catch(() => null);

        const path =
            (body && typeof body.path === 'string' && body.path) ||
            request.headers.get('referer') ||
            undefined;

        const method =
            request.headers.get('x-http-method-override') || request.method;
        const locale = request.headers.get('accept-language') || undefined;

        const now = new Date();

        await connectDB();

        await Promise.all([
            ActivityModel.findOneAndUpdate(
                { userId, ip },
                {
                    $set: {
                        userAgent,
                        deviceType: ua.device.type,
                        deviceVendor: ua.device.vendor,
                        deviceModel: ua.device.model,
                        browserName: ua.browser.name,
                        browserVersion: ua.browser.version,
                        osName: ua.os.name,
                        osVersion: ua.os.version,
                        path,
                        method,
                        locale,
                        lastSeen: now,
                    },
                },
                { upsert: true, new: true },
            ),
            UserModel.findByIdAndUpdate(userId, {
                lastActive: now,
            }),
        ]);

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ success: true });
    }
}
