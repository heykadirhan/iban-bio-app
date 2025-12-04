import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        username: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
        },
        displayName: { type: String },
        bio: { type: String, maxlength: 160 },
        avatarUrl: { type: String },
        allowSearchByPhone: { type: Boolean, default: true },
        lastLogin: { type: Date },
    },
    { timestamps: true },
);

export const UserModel =
    mongoose.models.User || mongoose.model('User', UserSchema);
