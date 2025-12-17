import { PaymentMethodModel, UserModel } from '@/core/models';
import { connectDB, decrypt, getServerAuth, HttpStatus } from '@/lib';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();

        const session = await getServerAuth();
        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: HttpStatus.UNAUTHORIZED },
            );
        }

        const user: any = await UserModel.findById(session.user.id).lean();
        if (!user)
            return NextResponse.json(
                { error: 'User not found' },
                { status: HttpStatus.NOT_FOUND },
            );

        const paymentMethods = await PaymentMethodModel.find({
            user: session.user.id,
        })
            .lean()
            .sort({ order: 1 })
            .select('+iv');

        return NextResponse.json({
            success: true,
            data: {
                stats: {
                    totalViews: user.viewCount || 0,
                    totalCopies: paymentMethods.reduce(
                        (acc, method) => acc + (method.copyCount || 0),
                        0,
                    ),
                },
                paymentMethods: paymentMethods.map((method) => ({
                    ...method,
                    decryptedValue: decrypt({
                        content: method.encryptedValue,
                        iv: method.iv,
                    }),
                    encryptedValue: undefined,
                    iv: undefined,
                })),
            },
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: HttpStatus.BAD_REQUEST },
        );
    }
}
