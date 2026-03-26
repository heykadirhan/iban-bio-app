import type { Metadata } from 'next';
import IbanQrGeneratorView from '@/views/tools/iban-qr-generator/view';
import { HomeLayout } from '@/layouts/home-layout';

export const metadata: Metadata = {
    title: 'IBAN QR Code Generator | iban.bio',
    description:
        'Generate professional QR codes for your IBAN instantly. Perfect for business cards, tables, and social media.',
    openGraph: {
        title: 'IBAN QR Code Generator | iban.bio',
        description:
            'Generate professional QR codes for your IBAN instantly. Perfect for business cards, tables, and social media.',
    },
};

export default function IbanQrGeneratorPage() {
    return (
        <HomeLayout>
            <IbanQrGeneratorView />
        </HomeLayout>
    );
}
