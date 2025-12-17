import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { CookieStorageKey } from '@core/enums';

type StorageKeyProp = keyof typeof CookieStorageKey;

export namespace CookieStorageService {
    export function save(key: StorageKeyProp, item: string) {
        if (!key) return;
        setCookie(CookieStorageKey[key], item);
    }

    export function get(key: StorageKeyProp) {
        return getCookie(CookieStorageKey[key]);
    }

    export function remove(key: StorageKeyProp) {
        removeCookie(key);
    }
}
