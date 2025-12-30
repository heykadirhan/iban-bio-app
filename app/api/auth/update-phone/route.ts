import { updatePhoneReqDto } from '@/core/dtos';
import { UserModel } from '@/core/models';
import {
    checkVerificationCode,
    connectDB,
    getServerAuth,
    HttpStatus,
} from '@/lib';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const unparsedBody = await req.json();
        const { phone, country, otp } = updatePhoneReqDto.parse(unparsedBody);

        const session = await getServerAuth();
        if (!session?.user) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Unauthorized',
                },
                { status: HttpStatus.UNAUTHORIZED },
            );
        }

        const otpResult = await checkVerificationCode(phone, otp);
        if (!otpResult.valid && process.env.NODE_ENV !== 'development') {
            throw new Error('Invalid OTP code');
        }

        const isAlreadyInUse = await UserModel.findOne({
            phone,
            _id: { $ne: session.user.id },
        });
        if (isAlreadyInUse) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        'This phone number is already associated with another account.',
                },
                { status: HttpStatus.CONFLICT },
            );
        }

        await UserModel.findByIdAndUpdate(session.user.id, { phone, country });

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
