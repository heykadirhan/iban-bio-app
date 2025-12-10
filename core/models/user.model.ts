import mongoose from 'mongoose';
import { ProfileVisibility } from '@core/enums';

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
        title: { type: String },
        bio: { type: String, maxlength: 160 },
        avatarUrl: { type: String },
        persona: { type: String },
        allowSearchByPhone: { type: Boolean, default: true },
        viewCount: { type: Number, default: 0 },
        visibility: {
            type: String,
            required: true,
            enum: Object.values(ProfileVisibility),
            default: ProfileVisibility.LINK_ONLY,
        },
        lastLogin: { type: Date },
    },
    { timestamps: true },
);

export const UserModel =
    mongoose.models.User || mongoose.model('User', UserSchema);
