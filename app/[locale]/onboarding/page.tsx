import { Routes } from '@/core/constants';
import { getServerAuth } from '@/lib';
import OnboardingPage from '@/views/onboarding';
import { redirect } from 'next/navigation';

export default async function Page() {
    const session = await getServerAuth();

    if (!session?.user) {
        redirect(Routes.GET_STARTED);
    }
    if (session.user && session.user.username) {
        redirect(Routes.DASHBOARD);
    }
    return <OnboardingPage />;
}
