import mongoose from 'mongoose';
import { PaymentMethodType } from '@core/enums';

interface IPaymentMethod extends mongoose.Document {
    user: mongoose.Types.ObjectId;
    type: PaymentMethodType;
    title?: string;
    appearance?: string;

    encryptedValue: string;
    iv: string;

    meta: {
        accountHolderName?: string;
        bankName?: string;
        bankBic?: string;
        currency?: string;
        coin?: string;
        network?: string;
        appName?: string;
        linkName?: string;
    };

    order: number;
    copyCount: number;
    isActive: boolean;
    deletedAt?: Date | null;
    createdAt: string;
    updatedAt: string;
}

interface IPaymentMethodModel extends mongoose.Model<IPaymentMethod> {
    findOneDeleted(
        query: mongoose.FilterQuery<IPaymentMethod>,
    ): Promise<IPaymentMethod | null>;
    softDelete(
        query: mongoose.FilterQuery<IPaymentMethod>,
    ): Promise<IPaymentMethod | null>;
    restore(
        query: mongoose.FilterQuery<IPaymentMethod>,
    ): Promise<IPaymentMethod | null>;
}

const PaymentMethodSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        type: {
            type: String,
            required: true,
            enum: Object.values(PaymentMethodType),
        },
        title: { type: String },
        appearance: { type: String },

        encryptedValue: {
            type: String,
            required: true,
        },
        iv: { type: String, required: true, select: false },

        meta: {
            accountHolderName: String,
            bankName: String,
            bankBic: String,
            currency: String,
            coin: String,
            network: String,
            appName: String,
            linkName: String,
        },

        order: { type: Number, default: 0 },
        copyCount: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
        deletedAt: { type: Date },
    },
    { timestamps: true },
);

PaymentMethodSchema.pre(/^find/, function (next) {
    const query = (this as any).getQuery();

    if (query.deletedAt === undefined) {
        (this as any).where({ deletedAt: null });
    }

    next();
});

PaymentMethodSchema.statics.findOneDeleted = async function (
    query: mongoose.FilterQuery<IPaymentMethod>,
) {
    const doc = await (this as any).collection.findOne(query);
    return doc ? this.hydrate(doc) : null;
};

PaymentMethodSchema.statics.softDelete = async function (
    query: mongoose.FilterQuery<IPaymentMethod>,
) {
    return this.findOneAndUpdate(
        query,
        { deletedAt: new Date() },
        { new: true },
    );
};

export const PaymentMethodModel =
    (mongoose.models.PaymentMethod as IPaymentMethodModel) ||
    mongoose.model<IPaymentMethod, IPaymentMethodModel>(
        'PaymentMethod',
        PaymentMethodSchema,
    );
