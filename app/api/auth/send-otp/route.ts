import { sendOtpReqDto } from '@/core/dtos';
import { connectDB, HttpStatus, sendVerficationCode } from '@/lib';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const unparsedBody = await req.json();
        const { phone } = sendOtpReqDto.parse(unparsedBody);

        if (process.env.NODE_ENV !== 'development') {
            const result = await sendVerficationCode(phone);

            if (!result.success) {
                return NextResponse.json(
                    { message: result.message },
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
