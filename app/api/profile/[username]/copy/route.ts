import { PaymentMethodModel } from '@/core/models';
import { connectDB, decrypt, HttpStatus } from '@/lib';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { methodId } = await req.json();

        await connectDB();

        const paymentMethod = await PaymentMethodModel.findByIdAndUpdate(
            methodId,
            {
                $inc: { copyCount: 1 },
            },
        );

        const decryptedValue = decrypt(paymentMethod!.encryptedValue);

        return NextResponse.json({ success: true, data: decryptedValue });
    } catch {
        return NextResponse.json(
            { error: 'Copy error' },
            { status: HttpStatus.BAD_REQUEST },
        );
    }
}
