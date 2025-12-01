import { MetaFuncProps } from '@/core/interfaces';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default function Page() {
    notFound();
}

export async function generateMetadata({
    params,
}: MetaFuncProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: 'METADATA.NOT_FOUND',
    });
    return {
        title: t('TITLE'),
        description: t('DESCRIPTION'),
    };
}
