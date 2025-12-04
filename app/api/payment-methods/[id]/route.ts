import { PaymentMethodModel } from '@/core/models';
import { connectDB, encrypt, getServerAuth, HttpStatus } from '@/lib';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
    req: NextRequest,
    { params: { id } }: { params: { id: string } },
) {
    try {
        await connectDB();

        const session = await getServerAuth();
        if (!session)
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: HttpStatus.UNAUTHORIZED },
            );

        const body = await req.json();
        const encryptedValue = encrypt(body.value);

        await PaymentMethodModel.findOneAndUpdate(
            { _id: id, user: session.user.id },
            {
                encryptedValue: encryptedValue.content,
                iv: encryptedValue.iv,
                title: body.title,
                description: body.description,
                visibility: body.visibility,
                isActive: body.isActive,
                order: body.order,
            },
        );

        return NextResponse.json({ success: true, id });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: HttpStatus.BAD_REQUEST },
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params: { id } }: { params: { id: string } },
) {
    try {
        await connectDB();

        const session = await getServerAuth();
        if (!session)
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: HttpStatus.UNAUTHORIZED },
            );

        await PaymentMethodModel.deleteOne({
            _id: id,
            user: session.user.id,
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: HttpStatus.BAD_REQUEST },
        );
    }
}
