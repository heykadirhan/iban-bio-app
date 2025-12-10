import '@/assets/styles/global.css';
import type { Metadata } from 'next';
import { Gabarito } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { PropsWithChildren } from 'react';
import { getTranslations } from 'next-intl/server';
import { MetaFuncProps } from '@/core/interfaces';
import { TOAST_CONFIG } from '@/core/config';
import { AuthWrapper } from '@/components/auth-wrapper';

const fontFamily = Gabarito({
    subsets: ['latin'],
});

export default async function RootLayout({
    children,
    locale,
}: PropsWithChildren<{ locale: string }>) {
    return (
        <html lang={locale}>
            <head>
                <link
                    rel="apple-touch-icon"
                    href="/icons/apple-touch-icon.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="57x57"
                    href="/icons/apple-touch-icon-57x57.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="72x72"
                    href="/icons/apple-touch-icon-72x72.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="76x76"
                    href="/icons/apple-touch-icon-76x76.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="114x114"
                    href="/icons/apple-touch-icon-114x114.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="120x120"
                    href="/icons/apple-touch-icon-120x120.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="144x144"
                    href="/icons/apple-touch-icon-144x144.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="152x152"
                    href="/icons/apple-touch-icon-152x152.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/icons/apple-touch-icon-180x180.png"
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

export async function generateMetadata({
    params,
}: MetaFuncProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'METADATA.ROOT' });

    return {
        title: t('TITLE'),
        description: t('DESCRIPTION'),
        keywords: ['iban'],
        authors: [{ name: 'Kadir Yılmaz', url: 'https://kadirhan.dev' }],
        creator: 'Kadir Yılmaz',
        metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
        openGraph: {
            title: t('OG_TITLE'),
            description: t('OG_DESCRIPTION'),
            url: process.env.NEXT_PUBLIC_APP_URL,
            siteName: t('OG_TITLE'),
            images: [
                {
                    url: `/og-${locale}.png`,
                    width: 1200,
                    height: 630,
                    alt: t('OG_IMAGE_ALT'),
                },
            ],
            locale: locale === 'tr' ? 'tr_TR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('OG_TITLE'),
            description: t('OG_DESCRIPTION'),
            images: [`/og-${locale}.png`],
        },
    };
}
