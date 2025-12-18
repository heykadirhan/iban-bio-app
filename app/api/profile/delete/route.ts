import { PaymentMethodModel, UserModel } from '@/core/models';
import { ShareTokenModel } from '@/core/models/share-token.model';
import { connectDB, getServerAuth, HttpStatus } from '@/lib';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        await connectDB();

        const session = await getServerAuth();
        if (!session)
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: HttpStatus.UNAUTHORIZED },
            );

        await UserModel.deleteOne({ _id: session.user.id });
        await PaymentMethodModel.deleteMany({ user: session.user.id });
        await ShareTokenModel.deleteMany({ user: session.user.id });

        return NextResponse.json({ success: true }, { status: HttpStatus.OK });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: HttpStatus.BAD_REQUEST },
        );
    }
}
