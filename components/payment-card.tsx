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
    Edit2,
    Trash2,
    Power,
    User,
    Network,
    ArrowRightLeft,
    CornerDownRight,
} from 'lucide-react'; // CornerDownRight eklendi
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
    return `${val.slice(0, 4)}...${val.slice(-4)}`;
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
                meta?.coin ||
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

// Badge bileşeni küçültüldü ve daha minimal hale getirildi
const MiniBadge = ({
    icon: Icon,
    text,
    className,
}: {
    icon?: any;
    text: string;
    className?: string;
}) => (
    <div
        className={cn(
            'flex items-center gap-1 text-[10px] font-medium text-zinc-400',
            className,
        )}>
        {Icon && <Icon size={10} />}
        <span>{text}</span>
    </div>
);

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
    }, [decryptedValue, meta.coin]);

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

    // UI HELPER: Meta verileri tek bir satırda toplamak için
    const renderMetaInfo = () => {
        const items = [];

        // 1. Provider Text (Eğer özel başlık varsa, provider'ı meta olarak göster)
        if (title && visuals.providerText) {
            items.push(
                <span
                    key="provider"
                    className="text-zinc-400">
                    {visuals.providerText}
                </span>,
            );
        }

        // 2. Network Badge
        if (type === PaymentMethodType.CRYPTO && meta.network) {
            items.push(
                <MiniBadge
                    key="network"
                    icon={Network}
                    text={meta.network}
                    className="text-emerald-400"
                />,
            );
        }

        // 3. Currency Badge
        if (meta.currency) {
            items.push(
                <MiniBadge
                    key="currency"
                    icon={ArrowRightLeft}
                    text={
                        currencies(meta.currency)
                            ? `${meta.currency} (${currencies(meta.currency)})`
                            : meta.currency
                    }
                    className="text-blue-400"
                />,
            );
        }

        if (items.length === 0) return null;

        return (
            <div className="flex flex-wrap items-center gap-2 text-[11px] leading-none mt-1.5">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2">
                        {index > 0 && (
                            <div className="h-0.5 w-0.5 rounded-full bg-zinc-600" />
                        )}
                        {item}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                }}
                className={cn(
                    'group relative w-full overflow-hidden rounded-xl border border-white/5 bg-[#18181b] p-4 transition-all duration-200 hover:border-white/10 hover:shadow-lg active:scale-[0.99] select-none cursor-pointer',
                    isDashboard && !isActive && 'opacity-60 grayscale-[0.3]',
                    isLoading && 'pointer-events-none opacity-50',
                    className,
                )}>
                {/* Background Effects */}
                <div
                    className={`absolute inset-0 bg-gradient-to-r ${cardColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div className="relative z-10 flex gap-3">
                    {/* LEFT: ICON */}
                    <div
                        className={`
                            relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg 
                            bg-gradient-to-br ${cardColor} text-white shadow-md
                            ring-1 ring-white/10 mt-0.5
                        `}>
                        <div className="absolute inset-0 bg-white/20 blur-md opacity-50" />
                        <span className="relative z-10 font-bold drop-shadow-md">
                            {[
                                PaymentMethodType.CRYPTO,
                                PaymentMethodType.LINK,
                            ].includes(type) && !imageFailed ? (
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
                                    className="h-6 w-6 rounded-md"
                                    onLoadingComplete={(result) => {
                                        if (result.naturalWidth === 0)
                                            setImageFailed(true);
                                        else setImageFailed(false);
                                    }}
                                    onError={() => setImageFailed(true)}
                                />
                            ) : (
                                React.cloneElement(visuals.icon as any, {
                                    size: 18,
                                })
                            )}
                        </span>
                    </div>

                    {/* MIDDLE: CONTENT */}
                    <div className="flex flex-col min-w-0 flex-1">
                        {/* Header Row: Title & Copy Button */}
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex flex-col min-w-0">
                                <span className="truncate text-sm font-semibold text-zinc-100">
                                    {title || visuals.providerText}
                                </span>
                                {renderMetaInfo()}
                            </div>

                            {/* Copy Status Icon */}
                            <div
                                className={cn(
                                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200',
                                    copied
                                        ? 'bg-green-500/20 text-green-500'
                                        : 'bg-zinc-800/50 text-zinc-500 group-hover:bg-zinc-700 group-hover:text-zinc-300',
                                )}>
                                {type === PaymentMethodType.LINK ? (
                                    <LinkIcon size={12} />
                                ) : copied ? (
                                    <Check size={12} />
                                ) : (
                                    <Copy size={12} />
                                )}
                            </div>
                        </div>

                        {/* Value Row - Distinct Box */}
                        <div className="mt-2.5 relative group/value">
                            <div className="flex w-full items-center gap-2 rounded-md bg-black/20 border border-white/5 px-2.5 py-1.5 transition-colors group-hover:border-white/10 group-hover:bg-black/40">
                                <CornerDownRight
                                    size={10}
                                    className="text-zinc-600 shrink-0"
                                />
                                <span
                                    className={cn(
                                        'truncate font-mono text-[11px] text-zinc-300 w-full',
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
                </div>

                {/* BOTTOM: DASHBOARD ACTIONS */}
                {(copyCount !== undefined || isDashboard) && (
                    <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                            {copyCount !== undefined && (
                                <>
                                    <User size={10} />
                                    {type === PaymentMethodType.LINK ? (
                                        <span>{copyCount} opens</span>
                                    ) : (
                                        <span>{copyCount} copies</span>
                                    )}
                                </>
                            )}
                        </div>

                        {isDashboard && (
                            <div
                                className="relative flex items-center gap-1"
                                onClick={(e) => e.stopPropagation()}>
                                <button
                                    onClick={() =>
                                        togglePaymentMethodStatus(
                                            paymentData._id,
                                            paymentData.isActive,
                                        )
                                    }
                                    className={cn(
                                        'p-1.5 rounded-md transition-colors hover:bg-white/5',
                                        isActive
                                            ? 'text-zinc-400 hover:text-green-400'
                                            : 'text-zinc-500 hover:text-red-400',
                                    )}
                                    title={
                                        isActive ? 'Deactivate' : 'Activate'
                                    }>
                                    <Power size={14} />
                                </button>
                                <button
                                    onClick={() => onEdit?.()}
                                    className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                                    title="Edit">
                                    <Edit2 size={14} />
                                </button>
                                <button
                                    onClick={() =>
                                        deletePaymentMethod(paymentData._id)
                                    }
                                    className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                                    title="Delete">
                                    <Trash2 size={14} />
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
