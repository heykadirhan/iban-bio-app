import crypto from 'crypto';
import { ShareTokenModel } from '@/core/models/share-token.model';
import { connectDB, getServerAuth, HttpStatus } from '@/lib';
import { NextRequest, NextResponse } from 'next/server';

const durationMinutes = 60; // Token validity duration in minutes

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const session = await getServerAuth();
        if (!session)
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: HttpStatus.UNAUTHORIZED },
            );

        const token = crypto.randomBytes(4).toString('hex');

        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + durationMinutes);

        const shareToken = await ShareTokenModel.create({
            user: session.user.id,
            token,
            expiresAt,
        });

        return NextResponse.json(
            { success: true, data: { token: shareToken.token } },
            { status: HttpStatus.CREATED },
        );
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: HttpStatus.BAD_REQUEST },
        );
    }
}
