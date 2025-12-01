import type { MetadataRoute } from 'next';
import { Routes } from '@/core/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const base = process.env.NEXT_PUBLIC_APP_URL;

    const staticEntries: MetadataRoute.Sitemap = [
        {
            url: `${base}${Routes.ROOT}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
    ];

    return [...staticEntries];
}
