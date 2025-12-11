import mongoose from 'mongoose';
import { PaymentMethodType } from '../enums';

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
    },
    { timestamps: true },
);

export const PaymentMethodModel =
    mongoose.models.PaymentMethod ||
    mongoose.model('PaymentMethod', PaymentMethodSchema);
