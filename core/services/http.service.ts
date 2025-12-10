import toast from 'react-hot-toast';
import { getBearerToken } from '@core/utils';
import { CookieStorageService } from '@core/services';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace HttpService {
    export async function fetchWithRetry(
        url: string,
        options: RequestInit = {},
    ): Promise<{ success: boolean; data: any; message?: string }> {
        return fetch(url, options)
            .then(async (res) => {
                if (!res.ok) {
                    return Promise.reject(await res?.json());
                }
                return res?.json();
            })
            .catch((err) => {
                return Promise.reject(err.message);
            });
    }

    export async function request(
        route: string,
        options: Exclude<RequestInit, 'body'> = {
            cache: 'no-cache',
        },
    ) {
        const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/${route}`;
        const accessToken = CookieStorageService.get('ACCESS_TOKEN') || '';
        const requestOptions = {
            ...options,
            headers: {
                Authorization: getBearerToken(accessToken),
                ...options.headers,
            },
        };
        return fetchWithRetry(url, requestOptions).catch((err) => {
            if (typeof window !== 'undefined') {
                if (err.status === 401) return;
                console.log(err);
                const parsedErr =
                    err?.[0] === '['
                        ? JSON.parse(err.message || '')
                        : err?.message || err;
                const errMessage = Array.isArray(parsedErr)
                    ? parsedErr[0]?.message || parsedErr[0]
                    : parsedErr?.message || parsedErr || 'Something went wrong';
                toast.error(errMessage);
            }
            return Promise.reject(err);
        });
    }
}
