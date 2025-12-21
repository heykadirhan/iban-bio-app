import { Routes } from '@/core/constants';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { getServerAuth } from '@/lib';
import { DashboardPage } from '@/views/dashboard';
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
        <DashboardLayout title="Dashboard">
            <DashboardPage />
        </DashboardLayout>
    );
}

export const metadata = {
    title: 'Dashboard',
    description:
        'Your personal dashboard to manage your iban.bio account and payment methods.',
};
