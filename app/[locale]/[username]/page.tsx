import { PropsWithParams } from '@/core/interfaces';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { UserPage } from '@/views/user';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

type Props = PropsWithParams<{ locale: string; username: string }> & {
    searchParams: Promise<{ shareToken?: string }>;
};

export const getUser = async (username: string, shareToken?: string) => {
    const headersList = await headers();
    const cookieHeader = headersList.get('cookie');

    const res = await fetch(
        `${
            process.env.NEXT_PUBLIC_APP_URL
        }/api/profile/${username}?shareToken=${shareToken || ''}`,
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

export default async function Page({ params, searchParams }: Props) {
    const { username } = await params;
    const { shareToken } = await searchParams;

    const user = await getUser(username, shareToken as string);

    if (!user?.profile && !user?.paymentMethods) {
        return notFound();
    }

    return (
        <DashboardLayout>
            <UserPage user={user} />
        </DashboardLayout>
    );
}

export const generateMetadata = async ({ params, searchParams }: Props) => {
    const { username } = await params;
    const { shareToken } = await searchParams;

    const user = await getUser(username, shareToken);

    if (!user?.profile && !user?.paymentMethods) {
        return {};
    }

    const title = `${user.profile.displayName} (@${user.profile.username}) - Financial Profile`;
    const description = `Explore the secure financial profile of ${user.profile.displayName} on iban.bio. Manage payments and personal info safely.`;
    const displayName = user.profile.displayName;

    const ogImageUrl = `/api/og?username=${username}`;

    return {
        title,
        description: '',

        openGraph: {
            title: title,
            description: description,
            url: process.env.NEXT_PUBLIC_APP_URL + `/${username}`,
            siteName: 'iban.bio',
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: `${displayName} iban.bio Profile`,
                },
            ],
            locale: 'en_US',
            type: 'profile',
            username: username,
        },

        twitter: {
            card: 'summary_large_image',
            title: title,
            description: 'Secure payment and financial identity profile.',
            images: [ogImageUrl],
            creator: '@kadirhanyl',
        },

        robots: {
            googleBot: {
                index: true,
                follow: true,
                noimageindex: false,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },

        alternates: {
            canonical: process.env.NEXT_PUBLIC_APP_URL + `/${username}`,
        },
    };
};
