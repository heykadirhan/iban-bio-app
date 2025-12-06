import { PropsWithParams } from '@/core/interfaces';
import { UserPage } from '@/views/user';
import { notFound } from 'next/navigation';

export default async function Page({
    params,
}: PropsWithParams<{ locale: string; username: string }>) {
    const { username } = await params;

    const profileRes = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/profile/${username}`,
    );
    const user = await profileRes.json();

    if (!user?.profile && !user?.paymentMethods) {
        return notFound();
    }

    return <UserPage user={user} />;
}
