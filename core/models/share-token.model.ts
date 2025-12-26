import mongoose from 'mongoose';

const ShareTokenSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        token: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        isOneTime: {
            type: Boolean,
            default: false,
        },
        expiresAt: {
            type: Date,
            required: true,
            index: { expires: '0s' },
        },
    },
    { timestamps: true },
);

export const ShareTokenModel =
    mongoose.models.ShareToken ||
    mongoose.model('ShareToken', ShareTokenSchema);
