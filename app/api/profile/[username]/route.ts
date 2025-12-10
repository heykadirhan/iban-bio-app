import { NextRequest, NextResponse } from 'next/server';
import { connectDB, getServerAuth, HttpStatus } from '@/lib';
import { PaymentMethodModel, UserModel } from '@/core/models';
import { ProfileVisibility } from '@/core/enums';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ username: string }> },
) {
    const { username } = await params;

    try {
        await connectDB();

        const session = await getServerAuth();

        if (!username) {
            return NextResponse.json(
                { error: 'Username is required' },
                { status: HttpStatus.BAD_REQUEST },
            );
        }

        console.log(session);

        const user = await UserModel.findOne({
            username,
            // ...(session?.user.username !== username && {
            //     visibility: ProfileVisibility.PUBLIC,
            // }),
        }).select([
            'username',
            'displayName',
            'title',
            'bio',
            'avatarUrl',
            'allowSearchByPhone',
        ]);

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: HttpStatus.NOT_FOUND },
            );
        }

        const paymentMethods = await PaymentMethodModel.find({
            user: user._id,
            isActive: true,
        })
            .lean()
            .sort({ order: 1 });

        if (session?.user.id !== user._id) {
            await UserModel.updateOne(
                { _id: user._id },
                { $inc: { viewCount: 1 } },
            );
        }

        return NextResponse.json({
            profile: user,
            paymentMethods,
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: HttpStatus.BAD_REQUEST },
        );
    }
}
