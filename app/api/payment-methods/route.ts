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
                { success: false, message: 'Unauthorized' },
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
            { success: false, message: error.message },
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
                { success: false, message: 'Unauthorized' },
                { status: HttpStatus.UNAUTHORIZED },
            );

        const unparsedBody = await req.json();
        const body = paymentMethodReqDto.parse(unparsedBody);

        const value = {
            [PaymentMethodType.IBAN]: body.meta.ibanNumber,
            [PaymentMethodType.CRYPTO]: body.meta.address,
            [PaymentMethodType.APP]: body.meta.number,
            [PaymentMethodType.LINK]: body.meta.linkUrl,
        }[body.type];

        const encryptedData = encrypt(value || '');

        let currency: string | undefined;
        let bankName: string | undefined;
        let bankBic: string | undefined;

        if (body.type === PaymentMethodType.IBAN) {
            const ibanRes = await fetch(
                `https://api.ibanapi.com/v1/validate/${body.meta.ibanNumber.replace(
                    /\s+/g,
                    '',
                )}?api_key=${process.env.IBAN_API_KEY}`,
            ).catch((err) => {
                console.error('Error fetching IBAN API:', err);
                throw new Error('Failed to validate IBAN number');
            });
            const ibanData = await ibanRes.json();
            if (ibanData.result !== 200) {
                return NextResponse.json(
                    { success: false, message: 'Invalid IBAN number' },
                    { status: HttpStatus.BAD_REQUEST },
                );
            }
            currency = ibanData.data?.currency_code;
            bankName = ibanData.data?.bank?.bank_name;
            bankBic = ibanData.data?.bank?.bic;
        }

        const newMethod = await PaymentMethodModel.create({
            user: session.user.id,
            type: body.type,
            encryptedValue: encryptedData.content,
            iv: encryptedData.iv,
            title: body.title,
            appearance: body.appearance,
            meta: {
                ...body.meta,
                currency,
                bankName,
                bankBic,
            },
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
            { success: false, message: error.message },
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
                { success: false, message: 'Unauthorized' },
                { status: HttpStatus.UNAUTHORIZED },
            );

        const unparsedBody = await req.json();
        let body: any;
        if (!!unparsedBody.type) {
            body = paymentMethodReqDto.parse(unparsedBody);
        } else {
            body = paymentMethodBaseReqDto.partial().parse(unparsedBody);
        }

        const methodBeforeUpdated = await PaymentMethodModel.findOne({
            _id: body.id,
            user: session.user.id,
        }).select('+iv');

        if (!methodBeforeUpdated) {
            return NextResponse.json(
                { success: false, message: 'Payment method not found' },
                { status: HttpStatus.NOT_FOUND },
            );
        }

        const value = {
            [PaymentMethodType.IBAN]: body.meta?.ibanNumber,
            [PaymentMethodType.CRYPTO]: body.meta?.address,
            [PaymentMethodType.APP]: body.meta?.number,
            [PaymentMethodType.LINK]: body.meta?.linkUrl,
        }[body.type as PaymentMethodType];

        let encryptedData;
        let currency = methodBeforeUpdated.meta.currency;
        let bankName = methodBeforeUpdated.meta.bankName;
        let bankBic = methodBeforeUpdated.meta.bankBic;

        if (
            value &&
            value !==
                decrypt({
                    iv: methodBeforeUpdated.iv,
                    content: methodBeforeUpdated.encryptedValue,
                })
        ) {
            encryptedData = encrypt(value || '');

            if (body.type === PaymentMethodType.IBAN) {
                const ibanRes = await fetch(
                    `https://api.ibanapi.com/v1/validate/${value.replace(
                        /\s+/g,
                        '',
                    )}?api_key=${process.env.IBAN_API_KEY}`,
                );
                const ibanData = await ibanRes.json();
                if (ibanData.result !== 200) {
                    return NextResponse.json(
                        { success: false, message: 'Invalid IBAN number' },
                        { status: HttpStatus.BAD_REQUEST },
                    );
                }
                currency = ibanData.data?.currency_code;
                bankName = ibanData.data?.bank?.bank_name;
                bankBic = ibanData.data?.bank?.bic;
            }
        }

        await PaymentMethodModel.findOneAndUpdate(
            { _id: body.id, user: session.user.id },
            {
                type: body.type,
                encryptedValue: encryptedData?.content,
                iv: encryptedData?.iv,
                title: body.title,
                appearance: body.appearance,
                meta: {
                    ...methodBeforeUpdated.meta,
                    ...body.meta,
                    currency,
                    bankName,
                    bankBic,
                },
                order: body.order,
                isActive: body.isActive,
            },
        );

        return NextResponse.json({ success: true, id: body.id });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
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
                { success: false, message: 'Unauthorized' },
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
            { success: false, message: error.message },
            { status: HttpStatus.BAD_REQUEST },
        );
    }
}
