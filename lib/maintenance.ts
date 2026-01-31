import { MaintenanceModel } from '@/core/models';
import { connectDB } from './db';

export async function initMaintenanceMode(): Promise<void> {
    try {
        await connectDB();
        const exists = await MaintenanceModel.countDocuments();
        if (exists === 0) {
            await MaintenanceModel.create({ enabled: false });
        }
    } catch {
        // Ignore errors
    }
}

export async function getMaintenanceMode(): Promise<boolean> {
    try {
        await connectDB();
        const maintenance = await MaintenanceModel.findOne();
        return !!maintenance && maintenance.enabled;
    } catch {
        return false;
    }
}

export async function setMaintenanceMode(enabled: boolean): Promise<void> {
    try {
        await connectDB();
        await MaintenanceModel.findOneAndUpdate(
            {},
            { enabled },
            { upsert: true, new: true },
        );
    } catch {
        // Ignore errors
    }
}
