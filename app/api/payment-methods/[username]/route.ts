import { NextRequest, NextResponse } from 'next/server';
import { connectDB, decrypt, HttpStatus } from '@/lib';
import { PaymentMethodModel, UserModel } from '@/core/models';
import { PaymentMethodVisibility } from '@/core/enums';

export async function GET(
    request: NextRequest,
    { params }: { params: { username: string } },
) {
    const { username } = params;

    try {
        await connectDB();

        const user = await UserModel.findOne({ username }).select(
            'displayName bio avatarUrl allowSearchByPhone',
        );

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: HttpStatus.NOT_FOUND },
            );
        }

        const methods = await PaymentMethodModel.find({
            user: user._id,
            visibility: { $ne: PaymentMethodVisibility.PRIVATE },
        })
            .lean()
            .sort({ order: 1 });

        return NextResponse.json({
            profile: user,
            methods: methods.map((m) => ({
                ...m,
                value: decrypt({ iv: m.iv, content: m.encryptedValue }),
            })),
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: HttpStatus.BAD_REQUEST },
        );
    }
}
