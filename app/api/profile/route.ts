import { AUTH_CONFIG } from '@/core/config';
import { updateProfileReqDto } from '@/core/dtos/update-profile-req.dto';
import { UserModel } from '@/core/models';
import { connectDB, getServerAuth, HttpStatus } from '@/lib';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
    try {
        await connectDB();

        const session = await getServerSession(AUTH_CONFIG);
        if (!session)
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: HttpStatus.UNAUTHORIZED },
            );

        const unparsedBody = await req.json();
        const body = updateProfileReqDto.parse(unparsedBody);

        const usernameExists = await UserModel.findOne({
            username: body.username,
            _id: { $ne: session.user.id },
        });
        if (usernameExists) {
            return NextResponse.json(
                { error: 'Username already taken' },
                { status: HttpStatus.BAD_REQUEST },
            );
        }

        await UserModel.findOneAndUpdate(
            { _id: session.user.id },
            {
                avatarUrl: body.avatarUrl,
                displayName: body.displayName,
                username: body.username,
                persona: body.persona,
                visibility: body.visibility,
                bio: body.bio,
            },
        );

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: HttpStatus.BAD_REQUEST },
        );
    }
}
