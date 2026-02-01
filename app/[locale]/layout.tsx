import '@/assets/styles/global.css';
import type { Metadata } from 'next';
import { Gabarito } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { PropsWithChildren } from 'react';
import { TOAST_CONFIG, AUTH_CONFIG } from '@/core/config';
import { AuthWrapper } from '@/components/auth-wrapper';
import { ActivityLogger } from '../../components/activity-logger';
import { headers } from 'next/headers';
import { getServerSession } from 'next-auth';
import UAParser from 'ua-parser-js';
import { connectDB } from '@/lib/db';
import { ActivityModel, UserModel } from '@/core/models';

const fontFamily = Gabarito({
    subsets: ['latin'],
    display: 'swap',
    preload: true,
});

const logActivityIfSession = async () => {
    try {
        const session = await getServerSession(AUTH_CONFIG);
        const sessionUser = session?.user as
            | Record<string, string | undefined>
            | undefined;
        const userId = sessionUser?._id ?? sessionUser?.id ?? sessionUser?.sub;

        if (!userId) return;

        const h = await headers();
        const userAgent = h.get('user-agent') || '';
        const parser = new UAParser(userAgent);
        const ua = parser.getResult();

        const ip =
            h.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            h.get('x-real-ip') ||
            h.get('cf-connecting-ip') ||
            'unknown';

        const path =
            h.get('next-url') ||
            h.get('x-url') ||
            h.get('referer') ||
            undefined;

        const method = h.get('x-http-method-override') || undefined;
        const locale = h.get('accept-language') || undefined;

        const now = new Date();

        await connectDB();

        await Promise.all([
            ActivityModel.findOneAndUpdate(
                { userId, ip },
                {
                    $set: {
                        userAgent,
                        deviceType: ua.device.type,
                        deviceVendor: ua.device.vendor,
                        deviceModel: ua.device.model,
                        browserName: ua.browser.name,
                        browserVersion: ua.browser.version,
                        osName: ua.os.name,
                        osVersion: ua.os.version,
                        path,
                        method,
                        locale,
                        lastSeen: now,
                    },
                },
                { upsert: true, new: true },
            ),
            UserModel.findByIdAndUpdate(userId, {
                lastActive: now,
            }),
        ]);
    } catch {
        // ignore activity logging errors
    }
};

export default async function RootLayout({ children }: PropsWithChildren) {
    await logActivityIfSession();
    return (
        <html lang="en">
            <head>
                <link
                    rel="preconnect"
                    href="https://fonts.googleapis.com"
                />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    rel="dns-prefetch"
                    href="https://www.googletagmanager.com"
                />
            </head>
            <Script
                id="hotjar"
                strategy="worker">
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
                <NextTopLoader
                    color="#615fff"
                    showSpinner={false}
                    height={2}
                />

                <NextIntlClientProvider>
                    <ActivityLogger />
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

export const dynamic = 'force-dynamic';

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

    manifest: '/manifest.json',

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

    icons: {
        icon: [
            {
                url: '/icons/favicon-32x32.png',
                sizes: '32x32',
                type: 'image/png',
            },
            {
                url: '/icons/favicon-16x16.png',
                sizes: '16x16',
                type: 'image/png',
            },
        ],
        apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
    },
};
