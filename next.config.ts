import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./locales/i18n.ts');

const securityHeaders = [
    {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
    },
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=16070400; includeSubDomains; preload',
    },
];

const nextConfig: NextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                hostname: process.env.AWS_STORAGE_URL,
            },
            {
                hostname: 't2.gstatic.com',
            },
            {
                hostname: 'assets.coincap.io',
            },
            {
                hostname: 'api.qrserver.com',
            },
            {
                hostname: 'lh3.googleusercontent.com',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: securityHeaders,
            },
        ];
    },
};

export default withNextIntl(nextConfig);
