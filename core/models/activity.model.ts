import mongoose from 'mongoose';

export interface IActivity extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    ip: string;
    userAgent?: string;
    deviceType?: string;
    deviceVendor?: string;
    deviceModel?: string;
    browserName?: string;
    browserVersion?: string;
    osName?: string;
    osVersion?: string;
    path?: string;
    method?: string;
    locale?: string;
    lastSeen?: Date;
    createdAt: string;
    updatedAt: string;
}

const ActivitySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        ip: {
            type: String,
            required: true,
        },
        userAgent: { type: String },
        deviceType: { type: String },
        deviceVendor: { type: String },
        deviceModel: { type: String },
        browserName: { type: String },
        browserVersion: { type: String },
        osName: { type: String },
        osVersion: { type: String },
        path: { type: String },
        method: { type: String },
        locale: { type: String },
        lastSeen: { type: Date },
    },
    { timestamps: true },
);

ActivitySchema.index({ userId: 1, ip: 1 }, { unique: true });

export const ActivityModel =
    (mongoose.models.Activity as mongoose.Model<IActivity>) ||
    mongoose.model<IActivity>('Activity', ActivitySchema);
