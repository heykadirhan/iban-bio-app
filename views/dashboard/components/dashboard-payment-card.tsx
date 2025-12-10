'use client';

import { Endpoints } from '@/core/constants';
import { PaymentMethodType } from '@/core/enums';
import { HttpService } from '@/core/services';
import { cn } from '@/lib/utils';
import {
    Check,
    Copy,
    Edit2,
    Loader2,
    Power,
    Trash2,
    Wallet2Icon,
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function DashboardPaymentCard({
    item,
    refetchList,
}: {
    item: {
        _id: string;
        type: PaymentMethodType;
        meta: any;
        isActive: boolean;
        copyCount: number;
        decryptedValue: string;
    };
    refetchList(): Promise<void>;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleEdit = (id: string) => {};

    const handleCopy = (value: string) => {
        setCopied(true);
        navigator.clipboard.writeText(value);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const handleToggleStatus = async (id: string) => {
        try {
            setIsLoading(true);

            await HttpService.request(Endpoints.PAYMENT_METHODS, {
                method: 'PATCH',
                body: JSON.stringify({
                    id,
                    isActive: !item.isActive,
                }),
            });

            item.isActive = !item.isActive;
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this payment method?'))
            return;

        try {
            setIsLoading(true);

            await HttpService.request(Endpoints.PAYMENT_METHODS, {
                method: 'DELETE',
                body: JSON.stringify({ id }),
            });

            toast.success('Payment method deleted from your profile!');
            await refetchList();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className={cn(
                'group relative bg-[#181818] hover:bg-[#202020] border border-zinc-800 rounded-2xl p-4 transition-all',
                isLoading && 'opacity-50 pointer-events-none',
            )}>
            {isLoading && (
                <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
                    <Loader2
                        size={16}
                        className="animate-spin"
                    />
                </div>
            )}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                            item.isActive
                                ? 'bg-zinc-800 text-white'
                                : 'bg-zinc-900 text-zinc-600'
                        }`}>
                        {item.type === PaymentMethodType.IBAN ? (
                            <img
                                src={`https://assets.coincap.io/assets/icons/${item.meta.coin.toLowerCase()}@2x.png`}
                                className="w-6 h-6"
                            />
                        ) : item.type === PaymentMethodType.CRYPTO ? (
                            <img
                                src={`https://assets.coincap.io/assets/icons/${item.meta.coin.toLowerCase()}@2x.png`}
                                className="w-6 h-6"
                            />
                        ) : item.type === PaymentMethodType.LINK ? (
                            <img
                                src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${item.decryptedValue}/&size=64`}
                                className="w-6 h-6"
                            />
                        ) : (
                            <Wallet2Icon size={18} />
                        )}
                    </div>
                    <div>
                        <h3
                            className={`font-medium ${
                                !item.isActive && 'text-zinc-500 line-through'
                            }`}>
                            {
                                {
                                    [PaymentMethodType.IBAN]: `Bank (${item.meta.currency})`,
                                    [PaymentMethodType.CRYPTO]: `${item.meta.coin} (${item.meta.network})`,
                                    [PaymentMethodType.DIGITAL_WALLET]: `${item.meta.appName}`,
                                    [PaymentMethodType.LINK]: `${item.meta.linkName}`,
                                }[item.type as PaymentMethodType]
                            }
                        </h3>
                        <p className="text-xs text-zinc-500">
                            {item.decryptedValue.length < 25
                                ? item.decryptedValue
                                : `${item.decryptedValue.slice(
                                      0,
                                      10,
                                  )}...${item.decryptedValue.slice(-10)}`}
                        </p>
                    </div>
                </div>

                <div className="absolute right-4 flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity bg-background/50 rounded-full p-0.5">
                    <button
                        onClick={() => handleToggleStatus(item._id)}
                        className={`p-2 rounded-full ${
                            item.isActive
                                ? 'text-green-500 hover:bg-green-500/10'
                                : 'text-zinc-600 hover:bg-zinc-800'
                        }`}
                        title="Active / Deactivate">
                        <Power size={16} />
                    </button>
                    <button
                        onClick={() => handleCopy(item.decryptedValue)}
                        className={`p-2 rounded-full ${
                            copied
                                ? 'text-green-500'
                                : 'text-zinc-400 hover:bg-zinc-700'
                        }`}
                        title="Copy">
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                    <button
                        onClick={() => handleEdit(item._id)}
                        className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-full">
                        <Edit2 size={16} />
                    </button>
                    <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-full">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {item.isActive && (
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                        <Copy size={10} /> {item.copyCount} times copied
                    </span>
                    <span className="flex items-center gap-1 text-green-500/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>{' '}
                        Active
                    </span>
                </div>
            )}
        </div>
    );
}
