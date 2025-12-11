export const getCurrencySymbol = (currency: string) =>
    (0)
        .toLocaleString('en', {
            style: 'currency',
            currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })
        .replace(/\d/g, '')
        .trim();
