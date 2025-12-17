import COUNTRIES from '@/assets/data/countries.json';

export function isoToCode(isoCode: string) {
    return COUNTRIES.find((c) => c.code === isoCode)?.dial;
}
