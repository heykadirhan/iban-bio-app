import { Routes } from '@/core/constants';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { getServerAuth } from '@/lib';
import { SettingsPage } from '@/views/settings';
import { Settings } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function Page() {
    const session = await getServerAuth();

    if (!session?.user) {
        redirect(Routes.GET_STARTED);
    }
    if (session.user && !session.user.username) {
        redirect(Routes.ONBOARDING);
    }
    return (
        <DashboardLayout title="Settings">
            <SettingsPage />
        </DashboardLayout>
    );
}
