import mongoose from 'mongoose';
import { ProfileVisibility } from '@core/enums';

interface IUser extends mongoose.Document {
    country?: string;
    phone?: string;
    email?: string;
    googleId?: string;
    username?: string;
    displayName?: string;
    title?: string;
    bio?: string;
    avatarUrl?: string;
    persona?: string;
    viewCount: number;
    visibility: ProfileVisibility;
    isAdmin?: boolean;
    deletedAt?: Date | null;
    createdAt: string;
    updatedAt: string;
}

interface IUserModel extends mongoose.Model<IUser> {
    findOneDeleted(query: mongoose.FilterQuery<IUser>): Promise<IUser | null>;
    softDelete(query: mongoose.FilterQuery<IUser>): Promise<IUser | null>;
    restore(query: mongoose.FilterQuery<IUser>): Promise<IUser | null>;
}

const UserSchema = new mongoose.Schema(
    {
        country: {
            type: String, // ISO
        },
        phone: {
            type: String,
            sparse: true,
            index: true,
        },
        email: {
            type: String,
            sparse: true,
            trim: true,
            lowercase: true,
        },
        googleId: {
            type: String,
            sparse: true,
        },
        username: {
            type: String,
            sparse: true,
            trim: true,
        },
        displayName: { type: String },
        title: { type: String },
        bio: { type: String, maxlength: 160 },
        avatarUrl: { type: String },
        persona: { type: String },
        viewCount: { type: Number, default: 0 },
        visibility: {
            type: String,
            required: true,
            enum: Object.values(ProfileVisibility),
            default: ProfileVisibility.EXPIRABLE,
        },
        isAdmin: { type: Boolean, default: false },
        deletedAt: { type: Date },
    },
    { timestamps: true },
);

UserSchema.pre(/^find/, function (next) {
    const query = (this as any).getQuery();

    if (query.deletedAt === undefined) {
        (this as any).where({ deletedAt: null });
    }

    next();
});

UserSchema.statics.findOneDeleted = async function (
    query: mongoose.FilterQuery<IUser>,
) {
    const doc = await (this as any).collection.findOne(query);
    return doc ? this.hydrate(doc) : null;
};

UserSchema.statics.softDelete = async function (
    query: mongoose.FilterQuery<IUser>,
) {
    return this.findOneAndUpdate(
        query,
        { deletedAt: new Date() },
        { new: true },
    );
};

UserSchema.statics.restore = async function (
    query: mongoose.FilterQuery<IUser>,
) {
    return this.findOneAndUpdate(query, { deletedAt: null }, { new: true });
};

export const UserModel =
    (mongoose.models.User as IUserModel) ||
    mongoose.model<IUser, IUserModel>('User', UserSchema);
