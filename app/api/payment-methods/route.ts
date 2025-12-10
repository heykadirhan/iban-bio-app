import { NextRequest, NextResponse } from 'next/server';
import { encrypt, decrypt, connectDB, getServerAuth, HttpStatus } from '@/lib';
import { PaymentMethodModel } from '@/core/models';
import { paymentMethodBaseReqDto, paymentMethodReqDto } from '@/core/dtos';
import { PaymentMethodType } from '@/core/enums';

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
        })
            .sort({ order: 1 })
            .select('+iv');

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

        const unparsedBody = await req.json();
        const body = paymentMethodReqDto.parse(unparsedBody);

        const value = {
            [PaymentMethodType.IBAN]: body.meta.ibanNumber,
            [PaymentMethodType.CRYPTO]: body.meta.address,
            [PaymentMethodType.DIGITAL_WALLET]: body.meta.number,
            [PaymentMethodType.LINK]: body.meta.linkUrl,
        }[body.type];

        const encryptedData = encrypt(value || '');

        const newMethod = await PaymentMethodModel.create({
            user: session.user.id,
            type: body.type,
            encryptedValue: encryptedData.content,
            iv: encryptedData.iv,
            title: body.title,
            appearance: body.appearance,
            meta: body.meta,
            order: await PaymentMethodModel.countDocuments({
                user: session.user.id,
            }),
        });

        return NextResponse.json(
            { success: true, id: newMethod._id },
            { status: HttpStatus.CREATED },
        );
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
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

        const unparsedBody = await req.json();
        let body;
        if (!!unparsedBody.type) {
            body = paymentMethodReqDto.parse(unparsedBody);
        } else {
            body = paymentMethodBaseReqDto.partial().parse(unparsedBody);
        }

        const value = {
            [PaymentMethodType.IBAN]: body.meta?.ibanNumber,
            [PaymentMethodType.CRYPTO]: body.meta?.address,
            [PaymentMethodType.DIGITAL_WALLET]: body.meta?.number,
            [PaymentMethodType.LINK]: body.meta?.linkUrl,
        }[body.type];

        let encryptedData;
        if (value) {
            encryptedData = encrypt(value || '');
        }

        await PaymentMethodModel.findOneAndUpdate(
            { _id: body.id, user: session.user.id },
            {
                type: body.type,
                encryptedValue: encryptedData?.content,
                iv: encryptedData?.iv,
                title: body.title,
                appearance: body.appearance,
                meta: body.meta,
                order: body.order,
                isActive: body.isActive,
            },
        );

        return NextResponse.json({ success: true, id: body.id });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
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
            { success: false, error: error.message },
            { status: HttpStatus.BAD_REQUEST },
        );
    }
}
