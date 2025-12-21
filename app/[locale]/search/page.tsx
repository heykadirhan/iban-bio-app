import { HomeLayout } from '@/layouts/home-layout';
import { SearchPage } from '@/views/search';
import { Metadata } from 'next';

export default function Page() {
    return (
        <HomeLayout>
            <SearchPage />
        </HomeLayout>
    );
}

export const metadata: Metadata = {
    title: 'Find User by Phone',
    description:
        'Search for a iban.bio profile using a phone number. Send money instantly without asking for IBAN.',
    openGraph: {
        title: 'Find & Pay - iban.bio',
        description: 'Find payment details with just a phone number.',
    },
};
