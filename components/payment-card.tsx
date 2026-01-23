'use client';

import COINS from '@/assets/data/coins.json';
import currencies from 'currency-symbol-map';
import { useEffect, useState } from 'react';
import {
    Copy,
    Check,
    CreditCard,
    Wallet,
    Smartphone,
    Globe,
    LinkIcon,
    Link,
    Edit2,
    Trash2,
    Power,
    User,
} from 'lucide-react';
import { HttpService } from '@/core/services';
import { APPERANCE_OPTIONS, Endpoints } from '@/core/constants';
import { PaymentMethodType } from '@/core/enums';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface PaymentCardProps {
    paymentData: any;
    isPreview?: boolean;
    className?: string;
    isDashboard?: boolean;
    onEdit?(): void;
    onRefetch?(): void;
}

const maskValue = (val: string, type: PaymentMethodType) => {
    if (!val) return '';
    if (type === PaymentMethodType.IBAN && val.length > 10) {
        return `${val.slice(0, 4)} **** **** ${val.slice(-4)}`;
    }
    if (val.length > 18) {
        return `${val.slice(0, 8)}...${val.slice(-6)}`;
    }
    return val;
};

const getVisuals = (type: PaymentMethodType, meta: any) => {
    let icon, providerText;
    let defaultColor = 'from-zinc-700 to-zinc-900';

    switch (type) {
        case PaymentMethodType.IBAN:
            icon = <CreditCard size={20} />;
            providerText = meta.bankName || 'Bank Account';
            defaultColor = 'from-blue-600 to-indigo-700';
            break;
        case PaymentMethodType.CRYPTO:
            icon = <Wallet size={20} />;
            providerText =
                COINS.find((coin) => coin.symbol === meta.coin)?.name ||
                'Crypto Wallet';
            defaultColor = 'from-yellow-600 to-amber-700';
            break;
        case PaymentMethodType.APP:
            icon = <Smartphone size={20} />;
            providerText = meta.appName || 'App Payment';
            defaultColor = 'from-pink-600 to-rose-700';
            break;
        case PaymentMethodType.LINK:
            icon = <LinkIcon size={20} />;
            providerText = meta.linkName || 'Payment Link';
            defaultColor = 'from-pink-600 to-rose-700';
            break;
        default:
            icon = <Globe size={20} />;
            providerText = 'Payment Method';
            break;
    }
    return { icon, providerText, defaultColor };
};

export default function PaymentCard({
    paymentData,
    isPreview,
    className,
    isDashboard = false,
    onEdit,
    onRefetch,
}: PaymentCardProps) {
    const {
        type,
        title,
        decryptedValue,
        meta,
        appearance,
        copyCount,
        isActive,
    } = paymentData;

    const value = decryptedValue;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imageFailed, setImageFailed] = useState<boolean>(false);
    const [copied, setCopied] = useState(false);
    const visuals = getVisuals(type, meta);

    useEffect(() => {
        setImageFailed(false);
    }, [decryptedValue]);

    const handleClick = async () => {
        if (isPreview) return;

        // 1. Link yönlendirmesi (Aynı kalabilir)
        if (type === PaymentMethodType.LINK) {
            window.open(value, '_blank');
            return;
        }

        try {
            if (!isPreview && !isDashboard) {
                setIsLoading(true);

                const textBlobPromise = HttpService.request(
                    Endpoints.PROFILE_COPY,
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            id: paymentData._id,
                        }),
                    },
                )
                    .then((res) => {
                        const text = res?.data || value;
                        return new Blob([text], { type: 'text/plain' });
                    })
                    .catch(() => {
                        return new Blob([value], { type: 'text/plain' });
                    });

                const item = new ClipboardItem({
                    'text/plain': textBlobPromise,
                });

                await navigator.clipboard.write([item]);
                setIsLoading(false);
            } else {
                await navigator.clipboard.writeText(value);
            }

            setCopied(true);

            if (typeof window !== 'undefined' && window.navigator?.vibrate) {
                window.navigator.vibrate(50);
            }

            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Copy error:', err);
        }
    };

    const cardColor =
        APPERANCE_OPTIONS.find((option) => option.id === appearance)?.class ||
        visuals.defaultColor;

    const togglePaymentMethodStatus = async (id: string, isActive: boolean) => {
        try {
            setIsLoading(true);

            await HttpService.request(Endpoints.PAYMENT_METHODS, {
                method: 'PATCH',
                body: JSON.stringify({
                    id,
                    isActive: !isActive,
                }),
            });

            paymentData.isActive = !paymentData.isActive;
        } finally {
            setIsLoading(false);
        }
    };

    const deletePaymentMethod = async (id: string) => {
        if (!confirm('Are you sure you want to delete this payment method?'))
            return;

        try {
            setIsLoading(true);

            await HttpService.request(Endpoints.PAYMENT_METHODS, {
                method: 'DELETE',
                body: JSON.stringify({ id }),
            });

            onRefetch?.();
            toast.success('Payment method deleted from your profile!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                handleClick();
            }}
            className={cn(
                `
        group relative w-full overflow-hidden rounded-2xl border border-white/5 
        bg-[#1a1a1a] p-4 transition-all duration-300 
        hover:border-white/10 hover:shadow-xl hover:shadow-black/50 
        active:scale-[0.98] select-none cursor-pointer`,
                isDashboard && !isActive && 'opacity-75 grayscale-[0.5]',
                isLoading && 'pointer-events-none opacity-50',
                className,
            )}>
            {/* Background Effects */}
            <div
                className={`absolute inset-0 bg-gradient-to-r ${cardColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
            />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                    <div
                        className={`
            relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl 
            bg-gradient-to-br ${cardColor} text-white shadow-lg
            ring-1 ring-white/10 group-hover:scale-105 transition-transform duration-300
          `}>
                        <div className="absolute inset-0 bg-white/20 blur-md opacity-50" />
                        <span className="relative z-10 font-bold drop-shadow-md">
                            {[
                                PaymentMethodType.CRYPTO,
                                PaymentMethodType.LINK,
                            ].includes(type) &&
                                !imageFailed && (
                                    <Image
                                        src={
                                            {
                                                [PaymentMethodType.CRYPTO]: `https://assets.coincap.io/assets/icons/${meta.coin?.toLowerCase()}@2x.png`,
                                                [PaymentMethodType.LINK]: `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${decryptedValue}/&size=64`,
                                                [PaymentMethodType.IBAN]: '',
                                                [PaymentMethodType.APP]: '',
                                            }[type as PaymentMethodType]
                                        }
                                        width={64}
                                        height={64}
                                        alt="icon"
                                        className="h-8 w-8 rounded-md"
                                        onLoadingComplete={(result) => {
                                            if (result.naturalWidth === 0) {
                                                setImageFailed(true);
                                            } else {
                                                setImageFailed(false);
                                            }
                                        }}
                                        onError={() => {
                                            setImageFailed(true);
                                        }}
                                    />
                                )}
                            {(imageFailed ||
                                [
                                    PaymentMethodType.IBAN,
                                    PaymentMethodType.APP,
                                ].includes(type)) &&
                                visuals.icon}
                        </span>
                    </div>

                    <div className="flex flex-col min-w-0">
                        <span className="truncate text-base font-bold text-white group-hover:text-white transition-colors">
                            <span>{title || visuals.providerText}</span>
                        </span>
                        {type === PaymentMethodType.IBAN &&
                            meta.accountHolderName && (
                                <span className="flex items-center gap-1 truncate text-xs text-zinc-400">
                                    <User size={10} />
                                    {meta.accountHolderName}
                                </span>
                            )}
                        {type === PaymentMethodType.CRYPTO && meta.network && (
                            <span className="flex items-center gap-1 truncate text-zinc-400 text-xs">
                                <Globe size={10} />
                                Network: {meta.network}
                            </span>
                        )}

                        <div className="mt-1.5 flex w-fit items-center gap-1.5 rounded-md bg-black/40 px-2 py-1 border border-white/5">
                            <span
                                className={cn(
                                    'truncate font-mono text-[10px] sm:text-xs text-zinc-300 group-hover:text-white transition-colors tracking-tight',
                                    { italic: !value },
                                    { 'line-through': !isActive },
                                )}>
                                {value
                                    ? maskValue(value, type)
                                    : 'Not Provided'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                    <div
                        className={`
                flex h-10 w-10 shrink-0 items-center justify-center rounded-full 
                transition-all duration-300 shadow-sm border border-transparent
                ${
                    copied
                        ? 'bg-green-500 text-white scale-110 shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                        : 'bg-zinc-800 text-zinc-400 group-hover:bg-white group-hover:text-black group-hover:border-zinc-300'
                }
             `}>
                        {type === PaymentMethodType.LINK ? (
                            <LinkIcon size={16} />
                        ) : copied ? (
                            <Check size={16} />
                        ) : (
                            <Copy size={16} />
                        )}
                    </div>
                </div>
            </div>

            {(copyCount !== undefined || !!meta.currency || isDashboard) && (
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between gap-2 text-xs text-zinc-500">
                    <div className="flex items-center gap-2 overflow-hidden">
                        {copyCount !== undefined && (
                            <span className="flex items-center gap-1 shrink-0">
                                {type === PaymentMethodType.LINK ? (
                                    <>
                                        <Link size={10} /> {copyCount} times
                                        opened
                                    </>
                                ) : (
                                    <>
                                        <Copy size={10} /> {copyCount} times
                                        copied
                                    </>
                                )}
                            </span>
                        )}

                        {copyCount !== undefined && meta.currency && (
                            <span>/</span>
                        )}

                        {meta.currency && (
                            <>
                                <span className="flex items-center gap-1 shrink-0">
                                    <Globe size={10} /> Currency:{' '}
                                    <b>
                                        {currencies(meta.currency)
                                            ? `${meta.currency} (${currencies(
                                                  meta.currency,
                                              )})`
                                            : meta.currency}
                                    </b>
                                </span>
                            </>
                        )}
                    </div>

                    {isDashboard && (
                        <div
                            className="flex items-center gap-1 relative"
                            onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() =>
                                    togglePaymentMethodStatus(
                                        paymentData._id,
                                        paymentData.isActive,
                                    )
                                }
                                className={`p-2 rounded-full ${
                                    isActive
                                        ? 'text-green-500 hover:bg-green-500/10'
                                        : 'text-red-500 hover:bg-red-500/10'
                                }`}
                                title="Active / Deactivate">
                                <Power size={16} />
                            </button>
                            <button
                                onClick={() => onEdit?.()}
                                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-full">
                                <Edit2 size={16} />
                            </button>
                            <button
                                onClick={() =>
                                    deletePaymentMethod(paymentData._id)
                                }
                                className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-full">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
