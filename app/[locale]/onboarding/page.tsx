import { Routes } from '@/core/constants';
import { getServerAuth } from '@/lib';
import OnboardingPage from '@/views/onboarding';
import { Metadata } from 'next';
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

export const metadata: Metadata = {
    title: "Let's get you set up",
    description: 'Complete your profile to get started with our services.',
};
