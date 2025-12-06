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
            'displayName title bio avatarUrl allowSearchByPhone',
        );

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: HttpStatus.NOT_FOUND },
            );
        }

        const paymentMethods = await PaymentMethodModel.find({
            user: user._id,
            visibility: PaymentMethodVisibility.PUBLIC,
        })
            .lean()
            .sort({ order: 1 });

        await UserModel.updateOne(
            { _id: user._id },
            { $inc: { viewCount: 1 } },
        );

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
