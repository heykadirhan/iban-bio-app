'use client';

import COINS from '@/assets/data/coins.json';
import currencies from 'currency-symbol-map';
import React, { useEffect, useState } from 'react';
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
import CopySuccessModal from './modal-copy-success';

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
    const [copySuccessModal, setCopySuccessModal] = useState<{
        isOpen: boolean;
        data: any;
    }>({
        isOpen: false,
        data: null,
    });
    const visuals = getVisuals(type, meta);

    useEffect(() => {
        setImageFailed(false);
    }, [decryptedValue]);

    const handleClick = async () => {
        if (isPreview) return;

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
            setCopySuccessModal({
                isOpen: true,
                data: {
                    encryptedValue: value,
                    meta: paymentData.meta,
                    title: paymentData.title,
                    type: paymentData.type,
                },
            });

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
        <>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                }}
                className={cn(
                    `
        group relative w-full overflow-hidden rounded-[20px] 
        border border-white/5 
        bg-[#09090b] p-4 transition-all duration-500
        hover:border-white/10 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.8)] hover:-translate-y-1
        active:scale-[0.98] select-none cursor-pointer`,
                    isDashboard && !isActive && 'opacity-60 grayscale',
                    isLoading && 'pointer-events-none opacity-50',
                    className,
                )}>
                {/* Ambient Glow Effects */}
                <div
                    className={cn(
                        'absolute -top-20 -right-20 h-56 w-56 rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-all duration-700 ease-in-out',
                        'bg-gradient-to-br',
                        cardColor,
                    )}
                />
                <div
                    className={cn(
                        'absolute -bottom-20 -left-20 h-56 w-56 rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-all duration-700 ease-in-out',
                        'bg-gradient-to-tl',
                        cardColor,
                    )}
                />

                {/* Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] overflow-hidden group-hover:scale-105 transition-transform duration-500 ring-1 ring-white/10 bg-white/[0.02]">
                            <div
                                className={cn(
                                    'absolute inset-0 bg-gradient-to-br opacity-25 mix-blend-plus-lighter',
                                    cardColor,
                                )}
                            />
                            <span className="relative z-10 font-bold drop-shadow-sm text-white/90">
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
                                                    [PaymentMethodType.IBAN]:
                                                        '',
                                                    [PaymentMethodType.APP]: '',
                                                }[type as PaymentMethodType]
                                            }
                                            width={64}
                                            height={64}
                                            alt="icon"
                                            className="h-7 w-7 rounded-md"
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
                                    React.cloneElement(
                                        visuals.icon as React.ReactElement,
                                        { size: 18 } as any,
                                    )}
                            </span>
                        </div>

                        <div className="flex flex-col min-w-0 gap-1">
                            <span className="truncate text-base font-semibold text-white/90 group-hover:text-white transition-colors">
                                {title || visuals.providerText}
                            </span>
                            {type === PaymentMethodType.IBAN &&
                                meta.accountHolderName && (
                                    <span className="flex items-center gap-1.5 truncate text-xs text-zinc-400 font-medium">
                                        <User
                                            size={12}
                                            className="text-zinc-500"
                                        />
                                        {meta.accountHolderName}
                                    </span>
                                )}
                            {type === PaymentMethodType.CRYPTO &&
                                meta.network && (
                                    <span className="flex items-center gap-1.5 truncate text-zinc-400 text-xs font-medium">
                                        <Globe
                                            size={12}
                                            className="text-zinc-500"
                                        />
                                        Network: {meta.network}
                                    </span>
                                )}

                            <div className="mt-1 flex w-fit items-center rounded-md bg-white/[0.03] px-2.5 py-1.5 border border-white/5 group-hover:bg-white/[0.05] transition-colors">
                                <span
                                    className={cn(
                                        'truncate font-mono text-xs sm:text-xs text-zinc-300 group-hover:text-zinc-100 transition-colors tracking-tight',
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

                    <div className="flex flex-col items-end gap-1 self-start">
                        <div
                            className={`
                flex h-8 w-8 shrink-0 items-center justify-center rounded-lg 
                transition-all duration-300 shadow-sm border
                ${
                    copied
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                        : 'bg-white/[0.03] border-white/5 text-zinc-400 group-hover:bg-white/[0.08] group-hover:text-white group-hover:border-white/10'
                }
             `}>
                            {type === PaymentMethodType.LINK ? (
                                <LinkIcon size={14} />
                            ) : copied ? (
                                <Check size={14} />
                            ) : (
                                <Copy size={14} />
                            )}
                        </div>
                    </div>
                </div>

                {(copyCount !== undefined ||
                    !!meta.currency ||
                    isDashboard) && (
                    <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3 text-xs font-medium text-zinc-500">
                        <div className="flex items-center gap-2 overflow-hidden">
                            {copyCount !== undefined && (
                                <span className="flex items-center gap-1.5 shrink-0 px-2 py-1 rounded-md bg-white/[0.02]">
                                    {type === PaymentMethodType.LINK ? (
                                        <>
                                            <Link size={12} /> {copyCount} times
                                            opened
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={12} /> {copyCount} times
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
                                        <Globe size={12} /> Currency:{' '}
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

            <CopySuccessModal
                isOpen={copySuccessModal.isOpen}
                onClose={() =>
                    setCopySuccessModal({ isOpen: false, data: null })
                }
                data={copySuccessModal.data}
            />
        </>
    );
}
