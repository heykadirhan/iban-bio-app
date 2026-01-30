import { sendOtpReqDto } from '@/core/dtos';
import { UserModel } from '@/core/models';
import { connectDB, HttpStatus, sendVerficationCode } from '@/lib';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const unparsedBody = await req.json();
        const { phone } = sendOtpReqDto.parse(unparsedBody);

        const user = await UserModel.findOneDeleted({ phone });
        if (!!user?.deletedAt) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        'Your account has been deleted. Please contact support if you want to restore it.',
                },
                { status: HttpStatus.NOT_FOUND },
            );
        }

        if (process.env.NODE_ENV !== 'development') {
            const result = await sendVerficationCode(phone);

            if (!result.success) {
                return NextResponse.json(
                    {
                        success: false,
                        message: 'SMS sending failed, please try again later.',
                    },
                    { status: HttpStatus.INTERNAL_SERVER_ERROR },
                );
            }
        }

        return NextResponse.json(
            {
                success: true,
            },
            { status: HttpStatus.OK },
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: error?.message || 'Something went wrong',
            },
            {
                status: HttpStatus.BAD_REQUEST,
            },
        );
    }
}
