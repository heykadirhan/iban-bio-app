import crypto from 'crypto';
import { ShareTokenModel } from '@/core/models/share-token.model';
import { connectDB, getServerAuth, HttpStatus } from '@/lib';
import { NextRequest, NextResponse } from 'next/server';
import { createShareTokenReqDto } from '@/core/dtos';
import { ShareTokenConfig } from '@/core/enums';

export async function GET() {
    try {
        await connectDB();

        const session = await getServerAuth();
        if (!session)
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: HttpStatus.UNAUTHORIZED },
            );

        const shareTokens = await ShareTokenModel.find({
            user: session.user.id,
            expiresAt: { $gt: new Date() },
        }).sort({ createdAt: -1 });

        return NextResponse.json(
            { success: true, data: shareTokens },
            { status: HttpStatus.OK },
        );
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: HttpStatus.BAD_REQUEST },
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const session = await getServerAuth();
        if (!session)
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: HttpStatus.UNAUTHORIZED },
            );

        const unparsedBody = await req.json();
        const body = createShareTokenReqDto.parse(unparsedBody);

        const expiresAt = new Date();
        let isOneTime: boolean = false;

        switch (body.config) {
            case ShareTokenConfig.FIFTEEN_MINUTES:
                expiresAt.setMinutes(expiresAt.getMinutes() + 15);
                break;
            case ShareTokenConfig.ONE_HOUR:
                expiresAt.setHours(expiresAt.getHours() + 1);
                break;
            case ShareTokenConfig.ONE_DAY:
                expiresAt.setHours(expiresAt.getHours() + 24);
                break;
            case ShareTokenConfig.ONE_VIEW:
                expiresAt.setHours(expiresAt.getHours() + 24);
                isOneTime = true;
                break;
            default:
                expiresAt.setHours(expiresAt.getHours() + 1);
        }

        const token = crypto.randomBytes(4).toString('hex');

        const shareToken = await ShareTokenModel.create({
            user: session.user.id,
            token,
            isOneTime,
            expiresAt,
        });

        return NextResponse.json(
            { success: true, data: { token: shareToken.token } },
            { status: HttpStatus.CREATED },
        );
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: HttpStatus.BAD_REQUEST },
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();

        const session = await getServerAuth();
        if (!session)
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: HttpStatus.UNAUTHORIZED },
            );

        const shareTokenId = (await req.json()).id;
        if (!shareTokenId)
            return NextResponse.json(
                { success: false, message: 'ID is required' },
                { status: HttpStatus.BAD_REQUEST },
            );

        await ShareTokenModel.deleteOne({
            _id: shareTokenId,
            user: session.user.id,
        });

        return NextResponse.json({ success: true }, { status: HttpStatus.OK });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: HttpStatus.BAD_REQUEST },
        );
    }
}
