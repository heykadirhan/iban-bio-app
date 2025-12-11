import { PropsWithParams } from '@/core/interfaces';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { UserPage } from '@/views/user';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

export const getUser = async (username: string) => {
    const headersList = await headers();
    const cookieHeader = headersList.get('cookie');

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/profile/${username}`,
        {
            headers: {
                Cookie: cookieHeader || '',
            },
        },
    );

    const user = await res.json();

    if (!res.ok || (!user?.profile && !user?.paymentMethods)) {
        return null;
    }

    return user;
};

export default async function Page({
    params,
}: PropsWithParams<{ locale: string; username: string }>) {
    const { username } = await params;

    const user = await getUser(username);

    if (!user?.profile && !user?.paymentMethods) {
        return notFound();
    }

    return (
        <DashboardLayout>
            <UserPage user={user} />
        </DashboardLayout>
    );
}

export const generateMetadata = async ({
    params,
}: PropsWithParams<{ locale: string; username: string }>) => {
    const { username } = await params;

    const user = await getUser(username);

    if (!user?.profile && !user?.paymentMethods) {
        return {};
    }

    return {
        title: `${user.profile.displayName} (@${user.profile.username}) - iban.bio`,
        description: '',
    };
};
