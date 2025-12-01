import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const base = (
        process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    ).replace(/\/$/, '');
    const env = process.env.NODE_ENV;
    const isProd = env === 'production';

    const allowRoot = isProd ? '/' : [];
    const disallowAll = isProd ? [] : ['/'];

    return {
        rules: [
            {
                userAgent: '*',
                allow: allowRoot,
                disallow: [...disallowAll, '/_next', '/static', '/*?*', '/*&*'],
            },
            { userAgent: 'AhrefsBot', disallow: ['/', '/'] },
            { userAgent: 'MJ12bot', disallow: ['/', '/'] },
        ],
        sitemap: [`${base}/sitemap.xml`],
        host: base,
    };
}
