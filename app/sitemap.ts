import type { MetadataRoute } from 'next';
import { Routes } from '@/core/constants';
import { UserModel } from '@/core/models';
import { ProfileVisibility } from '@/core/enums';
import { connectDB } from '@/lib';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const base = process.env.NEXT_PUBLIC_APP_URL;

    const staticEntries: MetadataRoute.Sitemap = [
        {
            url: `${base}${Routes.ROOT}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${base}${Routes.LEGAL}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${base}${Routes.SEARCH}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${base}${Routes.GET_STARTED}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
    ];

    await connectDB();

    const users = await UserModel.find({
        visibility: ProfileVisibility.PUBLIC,
    })
        .select('username updatedAt')
        .lean();

    let dynamicEntries: MetadataRoute.Sitemap = [];
    if (users.length) {
        dynamicEntries = users.map((u) => {
            const last = u.updatedAt ? new Date(u.updatedAt) : new Date();
            return {
                url: `${base}${Routes.USER.replace(':username', u.username)}`,
                lastModified: last,
                changeFrequency: 'hourly',
                priority: 0.7,
            };
        });
    }

    return [...staticEntries, ...dynamicEntries];
}
