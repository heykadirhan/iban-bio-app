import mongoose from 'mongoose';
import { PaymentMethodType, PaymentMethodVisibility } from '../enums';

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
        provider: {
            type: String,
            required: true,
        },

        encryptedValue: {
            type: String,
            required: true,
        },
        iv: { type: String, required: true },

        meta: {
            network: String,
            branchCode: String,
            currency: { type: String, default: 'TRY' },
            accountHolder: String,
        },
        title: { type: String },
        description: { type: String },
        visibility: {
            type: String,
            enum: Object.values(PaymentMethodVisibility),
            default: PaymentMethodVisibility.PUBLIC,
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
