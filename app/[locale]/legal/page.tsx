import { HomeLayout } from '@/layouts/home-layout';
import { LegalPage } from '@/views/legal';

export default function Page() {
    return (
        <HomeLayout>
            <LegalPage />
        </HomeLayout>
    );
}

export const metadata = {
    title: 'Legal Center',
    description: 'Terms of Service and Privacy Policy for iban.bio.',
};
