import { checkUsernameReqDto } from '@/core/dtos';
import { UserModel } from '@/core/models';
import { connectDB, getServerAuth, HttpStatus } from '@/lib';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const unparsedBody = await req.json();
        const { username } = checkUsernameReqDto.parse(unparsedBody);

        const session = await getServerAuth();

        const foundUser = await UserModel.findOne({
            username,
            ...(session ? { _id: { $ne: session.user.id } } : {}),
        }).lean();

        if (foundUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Username is already taken',
                },
                { status: HttpStatus.CONFLICT },
            );
        }

        return NextResponse.json({ success: true }, { status: HttpStatus.OK });
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
