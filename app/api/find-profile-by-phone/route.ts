import { ProfileVisibility } from '@/core/enums';
import { UserModel } from '@/core/models';
import { connectDB, HttpStatus } from '@/lib';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const phone = request.nextUrl.searchParams.get('phone');

        const user = await UserModel.findOne({
            phone,
        })
            .lean()
            .select([
                'username',
                'displayName',
                'title',
                'bio',
                'avatarUrl',
                'visibility',
            ]);
        if (!user)
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: HttpStatus.NOT_FOUND },
            );

        return NextResponse.json({
            success: true,
            data:
                user.visibility === ProfileVisibility.PUBLIC ? user : 'hidden',
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: HttpStatus.BAD_REQUEST },
        );
    }
}
