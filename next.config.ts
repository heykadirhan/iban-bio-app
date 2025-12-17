import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./locales/i18n.ts');

const securityHeaders = [
    {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
    },
];

const nextConfig: NextConfig = {
    reactStrictMode: false,
    images: {
        domains: [
            process.env.AWS_BUCKET_URL,
            't2.gstatic.com',
            'assets.coincap.io',
            'api.qrserver.com',
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
