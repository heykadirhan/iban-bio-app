import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { Locale } from '@core/enums';

export default getRequestConfig(async () => {
    const store = await cookies();
    const locale = store.get('locale')?.value || Locale.TR;

    return {
        locale,
        messages: (await import(`./${locale}.json`)).default,
    };
});
