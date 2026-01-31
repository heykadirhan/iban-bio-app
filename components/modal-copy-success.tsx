'use client';

import COINS from '@/assets/data/coins.json';
import currencies from 'currency-symbol-map';
import { PaymentMethodType } from '@/core/enums';
import {
    CheckCircle2,
    Copy,
    Globe,
    ShieldCheck,
    Wallet,
    CreditCard,
    Smartphone,
    Coins,
    User,
    Building2,
    Check,
    AlertTriangle,
    ArrowRightLeft,
} from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { useState } from 'react';

const getTypeDetails = (type: PaymentMethodType) => {
    switch (type) {
        case PaymentMethodType.IBAN:
            return {
                label: 'Bank Account',
                icon: CreditCard,
                color: 'text-blue-400',
                bg: 'bg-blue-500/10',
                border: 'border-blue-500/20',
            };
        case PaymentMethodType.CRYPTO:
            return {
                label: 'Crypto Wallet',
                icon: Wallet,
                color: 'text-yellow-400',
                bg: 'bg-yellow-500/10',
                border: 'border-yellow-500/20',
            };
        case PaymentMethodType.APP:
            return {
                label: 'Digital Wallet',
                icon: Smartphone,
                color: 'text-pink-400',
                bg: 'bg-pink-500/10',
                border: 'border-pink-500/20',
            };
        default:
            return {
                label: 'Link',
                icon: Globe,
                color: 'text-zinc-400',
                bg: 'bg-zinc-500/10',
                border: 'border-zinc-500/20',
            };
    }
};

interface CopySuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: {
        encryptedValue: string;
        meta?: Record<string, any>;
        type: PaymentMethodType;
    } | null;
}

export default function CopySuccessModal({
    isOpen,
    onClose,
    data,
}: CopySuccessModalProps) {
    if (!isOpen || !data) return null;

    const { encryptedValue, meta = {}, type } = data;
    const value = encryptedValue;
    const typeInfo = getTypeDetails(type);
    const TypeIcon = typeInfo.icon;

    const [isRecopied, setIsRecopied] = useState(false);

    const handleReCopy = () => {
        navigator.clipboard.writeText(value);
        if (typeof window !== 'undefined' && window.navigator?.vibrate) {
            window.navigator.vibrate(50);
        }

        setIsRecopied(true);
        setTimeout(() => setIsRecopied(false), 2000);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}>
            <DialogContent className="sm:max-w-sm border-zinc-800 bg-[#09090b] p-0 overflow-hidden gap-0 !max-h-[90vh] overflow-y-auto">
                <div
                    className={`-z-1 absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 ${typeInfo.bg} blur-[60px] rounded-full pointer-events-none opacity-40`}
                />

                <div className="p-6 !pt-12 flex flex-col items-center text-center">
                    <div className="mb-4 relative">
                        <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center ring-1 ring-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.2)] animate-in zoom-in duration-300">
                            <CheckCircle2 size={32} />
                        </div>
                    </div>

                    <DialogTitle className="text-xl font-bold text-white mb-1">
                        Copied Successfully!
                    </DialogTitle>
                    <p className="text-sm text-zinc-400">
                        Payment details copied to clipboard.
                    </p>

                    <div className="w-full mt-10 mb-6">
                        <div className="flex items-center justify-between gap-2 mb-1.5 px-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                Copied Value
                            </span>
                        </div>
                        <div
                            onClick={handleReCopy}
                            className="relative group bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 flex items-center justify-between gap-3 transition-all hover:border-zinc-600 hover:bg-zinc-800 cursor-pointer active:scale-[0.98]"
                            title="Click to copy again">
                            <code className="text-sm text-zinc-200 font-mono break-all text-left">
                                {value}
                            </code>
                            <div className="text-zinc-500 shrink-0 transition-colors group-hover:text-white">
                                {isRecopied ? (
                                    <Check
                                        size={14}
                                        className="text-green-500 animate-in zoom-in duration-200"
                                    />
                                ) : (
                                    <Copy size={14} />
                                )}
                            </div>
                        </div>

                        {type === PaymentMethodType.CRYPTO && (
                            <div className="mt-3 flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-left animate-in slide-in-from-top-1 duration-300">
                                <AlertTriangle
                                    size={16}
                                    className="text-amber-500 shrink-0 mt-0.5"
                                />
                                <p className="text-xs text-amber-200/90 leading-relaxed">
                                    Please ensure you are using the correct
                                    network. Sending assets to the wrong network
                                    may result in permanent loss.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="w-full space-y-3">
                        <div className="bg-zinc-900/30 rounded-xl border border-zinc-800/60 divide-y divide-white/5">
                            <div className="flex justify-between items-center p-3">
                                <span className="text-sm text-zinc-500 flex items-center gap-2">
                                    <User size={14} /> Type
                                </span>
                                <span
                                    className={`flex items-center gap-1.5 text-sm font-semibold truncate max-w-[150px] ${typeInfo.color}`}>
                                    <TypeIcon size={14} /> {typeInfo.label}
                                </span>
                            </div>

                            {meta.accountHolderName && (
                                <div className="flex justify-between items-center p-3">
                                    <span className="text-sm text-zinc-500 flex items-center gap-2">
                                        <User size={14} /> Account Holder
                                    </span>
                                    <span className="text-sm text-zinc-200 font-medium truncate max-w-[150px]">
                                        {meta.accountHolderName}
                                    </span>
                                </div>
                            )}

                            {meta.coin && (
                                <div className="flex justify-between items-center p-3">
                                    <span className="text-sm text-zinc-500 flex items-center gap-2">
                                        <Coins size={14} /> Coin
                                    </span>
                                    <span className="text-sm text-zinc-200 font-medium">
                                        {COINS.find(
                                            (coin) => coin.symbol === meta.coin,
                                        )?.name || meta?.coin}{' '}
                                        ({meta.coin})
                                    </span>
                                </div>
                            )}

                            {meta.network && (
                                <div className="flex justify-between items-center p-3">
                                    <span className="text-sm text-zinc-500 flex items-center gap-2">
                                        <ShieldCheck size={14} /> Network
                                    </span>
                                    <span className="text-sm font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                                        {meta.network}
                                    </span>
                                </div>
                            )}

                            {meta.currency && (
                                <div className="flex justify-between items-center p-3">
                                    <span className="text-sm text-zinc-500 flex items-center gap-2">
                                        <ArrowRightLeft size={14} /> Currency
                                    </span>
                                    <span className="text-sm text-zinc-200 font-medium">
                                        {currencies(meta.currency)
                                            ? `${meta.currency} (${currencies(meta.currency)})`
                                            : meta.currency}
                                    </span>
                                </div>
                            )}

                            {meta.bankName && (
                                <div className="flex justify-between items-center p-3">
                                    <span className="text-sm text-zinc-500 flex items-center gap-2">
                                        <Building2 size={14} /> Bank
                                    </span>
                                    <span className="text-sm text-zinc-200 font-medium">
                                        {meta.bankName}
                                    </span>
                                </div>
                            )}

                            {meta.appName && (
                                <div className="flex justify-between items-center p-3">
                                    <span className="text-sm text-zinc-500 flex items-center gap-2">
                                        <Building2 size={14} /> Provider
                                    </span>
                                    <span className="text-sm text-zinc-200 font-medium">
                                        {meta.appName}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-zinc-900 border-t border-white/5 sticky bottom-0">
                    <Button
                        onClick={onClose}
                        type="button"
                        size="lg"
                        className="w-full">
                        Done
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
