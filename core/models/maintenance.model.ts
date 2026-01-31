import mongoose from 'mongoose';

const MaintenanceSchema = new mongoose.Schema(
    {
        enabled: { type: Boolean, default: false },
    },
    { timestamps: true },
);

export const MaintenanceModel =
    (mongoose.models.Maintenance as mongoose.Model<any>) ||
    mongoose.model<any>('Maintenance', MaintenanceSchema);
