'use client';

import dynamic from 'next/dynamic';

export const PhoneSearchClient = dynamic(
    () =>
        import('./phone-search').then((mod) => ({
            default: mod.PhoneSearch,
        })),
    {
        loading: () => (
            <div className="h-12 animate-pulse bg-white/5 rounded-2xl" />
        ),
        ssr: false,
    },
);

export const SectionUseCasesClient = dynamic(
    () =>
        import('./section-use-cases').then((mod) => ({
            default: mod.SectionUseCases,
        })),
    {
        loading: () => (
            <div className="h-96 animate-pulse bg-white/5 rounded-3xl" />
        ),
        ssr: false,
    },
);

export const SectionFaqClient = dynamic(
    () =>
        import('./section-faq').then((mod) => ({
            default: mod.SectionFaq,
        })),
    {
        loading: () => (
            <div className="h-96 animate-pulse bg-white/5 rounded-3xl" />
        ),
        ssr: false,
    },
);
