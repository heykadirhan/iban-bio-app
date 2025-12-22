import '@/assets/styles/global.css';
import type { Metadata } from 'next';
import { Gabarito } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { PropsWithChildren } from 'react';
import { TOAST_CONFIG } from '@/core/config';
import { AuthWrapper } from '@/components/auth-wrapper';

const fontFamily = Gabarito({
    subsets: ['latin'],
});

export default async function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/icons/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/icons/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/icons/favicon-16x16.png"
                />
                <link
                    rel="manifest"
                    href="/manifest.json"
                />
            </head>

            <Script
                id="hotjar"
                strategy="afterInteractive">
                {`
				(function(h,o,t,j,a,r){
					h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
					h._hjSettings={hjid:${process.env.HOTJAR_SITE_ID},hjsv:6};
					a=o.getElementsByTagName('head')[0];
					r=o.createElement('script');r.async=1;
					r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
					a.appendChild(r);
				})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
				`}
            </Script>
            <GoogleAnalytics gaId={process.env.GA_ID} />

            <body className={`${fontFamily.className} antialiased dark`}>
                <NextTopLoader color="#615fff" />

                <NextIntlClientProvider>
                    <Toaster
                        position="bottom-right"
                        toastOptions={TOAST_CONFIG}
                    />

                    <AuthWrapper>{children}</AuthWrapper>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
    title: {
        default: 'iban.bio - Your Financial Identity in One Link',
        template: '%s | iban.bio',
    },
    description:
        'Consolidate your IBANs, crypto addresses, and payment links into one secure, shareable profile. The professional way to get paid.',
    keywords: [
        'payment link',
        'iban share',
        'crypto bio',
        'financial profile',
        'freelancer payments',
    ],
    authors: [{ name: 'kadirhan', url: 'https://kadirhan.dev' }],
    creator: 'kadirhan',

    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: process.env.NEXT_PUBLIC_APP_URL,
        siteName: 'iban.bio',
        title: 'iban.bio - One Link for All Your Payments',
        description:
            'Stop sharing raw IBANs. Create your secure financial profile in seconds.',
        images: [
            {
                url: '/api/og',
                width: 1200,
                height: 630,
                alt: 'iban.bio App Preview',
            },
        ],
    },

    twitter: {
        card: 'summary_large_image',
        title: 'iban.bio - One Link for All Your Payments',
        description: 'Your Financial ID. One Secure Link.',
        creator: '@kadirhanyl',
        images: ['/api/og'],
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};
