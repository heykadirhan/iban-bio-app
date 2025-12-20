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
            HOTJAR_SITE_ID: string;
            GA_ID: string;
            IBAN_API_KEY: string;
            NEXT_PUBLIC_CRYPTO_API_KEY: string;
            AWS_REGION: string;
            AWS_ACCESS_KEY_ID: string;
            AWS_SECRET_ACCESS_KEY: string;
            AWS_BUCKET_NAME: string;
            AWS_BUCKET_URL: string;
            TWILIO_ACCOUNT_SID: string;
            TWILIO_AUTH_TOKEN: string;
            TWILIO_SERVICE_SID: string;
            TWILIO_PHONE_NUMBER: string;
        }
    }
}

export type PropsWithParams<T extends object> = Record<'params', Promise<T>>;
export type MetaFuncProps = PropsWithParams<PropsWithLocale<Locale>>;
