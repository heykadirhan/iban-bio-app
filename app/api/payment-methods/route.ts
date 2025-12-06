import { NextRequest, NextResponse } from 'next/server';
import { encrypt, decrypt, connectDB, getServerAuth, HttpStatus } from '@/lib';
import { PaymentMethodModel } from '@/core/models';

export async function GET() {
    try {
        await connectDB();

        const session = await getServerAuth();

        if (!session)
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: HttpStatus.UNAUTHORIZED },
            );

        const methods = await PaymentMethodModel.find({
            userId: session.user.id,
        }).sort({ order: 1 });

        const decryptedMethods = methods.map((m) => ({
            ...m.toObject(),
            value: decrypt({ iv: m.iv, content: m.encryptedValue }),
            encryptedValue: undefined,
            iv: undefined,
        }));

        return NextResponse.json({ data: decryptedMethods });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: HttpStatus.BAD_REQUEST },
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const session = await getServerAuth();
        if (!session)
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: HttpStatus.UNAUTHORIZED },
            );

        const body = await req.json();
        const { type, provider, value, title, visibility } = body;

        const encryptedData = encrypt(value);

        const newMethod = await PaymentMethodModel.create({
            user: session.user.id,
            type,
            provider,
            encryptedValue: encryptedData.content,
            iv: encryptedData.iv,
            title,
            visibility,
            order: await PaymentMethodModel.countDocuments({
                user: session.user.id,
            }),
        });

        return NextResponse.json({ success: true, id: newMethod._id });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: HttpStatus.BAD_REQUEST },
        );
    }
}

export async function PATCH(req: NextRequest) {
    try {
        await connectDB();

        const session = await getServerAuth();
        if (!session)
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: HttpStatus.UNAUTHORIZED },
            );

        const { id, ...body } = await req.json();
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

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();

        const session = await getServerAuth();
        if (!session)
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: HttpStatus.UNAUTHORIZED },
            );

        const { id } = await req.json();

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
