import mongoose, { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
        },
        hashedPassword: {
            type: String,
        },
        passwordResetToken: {
            type: String,
        },
        passwordResetExpires: {
            type: Number,
        },
    },
    { timestamps: true },
);

export const UserModel =
    mongoose.models.User || mongoose.model('User', UserSchema);
