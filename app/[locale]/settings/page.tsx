import { Routes } from '@/core/constants';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { getServerAuth } from '@/lib';
import { SettingsPage } from '@/views/settings';
import { Metadata } from 'next';
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
        <DashboardLayout
            title="Settings"
            backHref={Routes.DASHBOARD}>
            <SettingsPage />
        </DashboardLayout>
    );
}

export const metadata: Metadata = {
    title: 'Settings',
    description: 'Manage your account settings and preferences.',
};
