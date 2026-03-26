export const revalidate = 21600;
export const dynamic = 'force-dynamic';

import type { MetadataRoute } from 'next';
import { Routes } from '@/core/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const base = process.env.NEXT_PUBLIC_APP_URL;

    const staticEntries: MetadataRoute.Sitemap = [
        {
            url: `${base}${Routes.ROOT}`,
            lastModified: '2026-03-26T00:00:00.000Z',
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${base}${Routes.SEARCH}`,
            lastModified: '2026-03-26T00:00:00.000Z',
            changeFrequency: 'daily',
            priority: 0.95,
        },
        {
            url: `${base}${Routes.GET_STARTED}`,
            lastModified: '2026-03-26T00:00:00.000Z',
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        {
            url: `${base}${Routes.TOOLS_IBAN_QR}`,
            lastModified: '2026-03-26T00:00:00.000Z',
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${base}${Routes.LEGAL}`,
            lastModified: '2026-03-26T00:00:00.000Z',
            changeFrequency: 'yearly',
            priority: 0.5,
        },
    ];
    return staticEntries;
}
