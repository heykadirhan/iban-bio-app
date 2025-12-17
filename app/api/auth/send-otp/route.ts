import { sendOtpReqDto } from '@/core/dtos';
import { OTPModel } from '@/core/models';
import { connectDB, HttpStatus } from '@/lib';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const unparsedBody = await req.json();
        const { phone } = sendOtpReqDto.parse(unparsedBody);

        const generatedOtp = Math.floor(
            100000 + Math.random() * 900000,
        ).toString();

        await OTPModel.findOneAndDelete({ phone });

        await OTPModel.create({ phone, otp: generatedOtp });

        if (process.env.NODE_ENV !== 'development') {
            // TODO: Send OTP via phone number
        }

        return NextResponse.json(
            {
                success: true,
                data: {
                    otp:
                        process.env.NODE_ENV === 'development'
                            ? generatedOtp
                            : undefined,
                },
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
