import { PaymentMethodModel } from '@/core/models';
import { connectDB, decrypt, getServerAuth, HttpStatus } from '@/lib';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { id } = await req.json();

        await connectDB();

        const session = await getServerAuth();

        const paymentMethod = await PaymentMethodModel.findById(id).select(
            '+iv',
        );

        if (!paymentMethod) {
            return NextResponse.json(
                { success: false, message: 'Payment method not found' },
                { status: HttpStatus.NOT_FOUND },
            );
        }

        if (paymentMethod.user.toString() !== session?.user.id.toString()) {
            await PaymentMethodModel.updateOne(
                { _id: id },
                {
                    $inc: { copyCount: 1 },
                },
            );
        }

        const decryptedValue = decrypt({
            content: paymentMethod.encryptedValue,
            iv: paymentMethod.iv,
        });

        return NextResponse.json({ success: true, data: decryptedValue });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error?.message || 'Copy error' },
            { status: HttpStatus.BAD_REQUEST },
        );
    }
}
