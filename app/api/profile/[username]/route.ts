import { NextRequest, NextResponse } from 'next/server';
import { connectDB, decrypt, getServerAuth, HttpStatus } from '@/lib';
import { PaymentMethodModel, UserModel } from '@/core/models';
import { ProfileVisibility } from '@/core/enums';
import { ShareTokenModel } from '@/core/models/share-token.model';

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
                { success: false, message: 'Username is required' },
                { status: HttpStatus.BAD_REQUEST },
            );
        }

        const user = await UserModel.findOne({
            username,
            ...(session?.user.username !== username && {
                visibility: { $ne: ProfileVisibility.PRIVATE },
            }),
        }).select([
            'username',
            'displayName',
            'title',
            'bio',
            'avatarUrl',
            'visibility',
        ]);

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: HttpStatus.NOT_FOUND },
            );
        }

        if (
            user.visibility === ProfileVisibility.EXPIRABLE &&
            session?.user.id !== user._id.toString()
        ) {
            const token = await ShareTokenModel.findOne({
                token: request.nextUrl.searchParams.get('shareToken'),
                user: user._id,
                expiresAt: { $gt: new Date() },
            });

            if (!token) {
                return NextResponse.json(
                    {
                        success: false,
                        message: 'User not found or link expired',
                    },
                    { status: HttpStatus.NOT_FOUND },
                );
            }
        }

        const paymentMethods = await PaymentMethodModel.find({
            user: user._id,
            isActive: true,
        })
            .lean()
            .sort({ order: 1 })
            .select('+iv');

        if (session?.user.id.toString() !== user._id.toString()) {
            await UserModel.updateOne(
                { _id: user._id },
                { $inc: { viewCount: 1 } },
            );
        }

        return NextResponse.json({
            profile: user,
            paymentMethods: paymentMethods.map((pm) => ({
                ...pm,
                encryptedValue: undefined,
                iv: undefined,
                decryptedValue: decrypt({
                    content: pm.encryptedValue,
                    iv: pm.iv,
                }),
            })),
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: HttpStatus.BAD_REQUEST },
        );
    }
}
