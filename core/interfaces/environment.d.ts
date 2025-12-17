import { Locale } from '../enums';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_APP_URL: string;
            NEXTAUTH_URL: string;
            NEXTAUTH_SECRET: string;
            MONGODB_URI: string;
            MONGODB_NAME: string;
            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
            GA_ID: string;
            IBAN_API_KEY: string;
            NEXT_PUBLIC_CRYPTO_API_KEY: string;
        }
    }
}

export type PropsWithParams<T extends object> = Record<'params', Promise<T>>;
export type MetaFuncProps = PropsWithParams<PropsWithLocale<Locale>>;
