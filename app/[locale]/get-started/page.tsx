import { Routes } from '@/core/constants';
import { getServerAuth } from '@/lib';
import { GetStartedPage } from '@/views/get-started';
import { redirect } from 'next/navigation';

export default async function Page() {
    const session = await getServerAuth();

    if (session?.user) {
        redirect(Routes.DASHBOARD);
    }
    return <GetStartedPage />;
}

export const metadata = {
    title: 'Get Started',
    description: 'Begin your journey with iban.bio by setting up your account.',
};
