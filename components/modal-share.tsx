'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import {
    Check,
    Copy,
    Loader2,
    MessageCircle,
    Smartphone,
    XCircleIcon,
} from 'lucide-react';
import Image from 'next/image';

export function ModalShare({
    isOpen,
    username,
    shareToken,
    onClose,
}: {
    isOpen: boolean;
    username: string;
    shareToken?: string;
    onClose: () => void;
}) {
    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${username}${
        shareToken ? `?shareToken=${shareToken}` : ''
    }`;
    const [copied, setCopied] = useState(false);
    const [qrLoaded, setQrLoaded] = useState(false);

    useEffect(() => {
        setQrLoaded(false);
    }, [isOpen]);

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}>
            <DialogContent>
                <DialogTitle className="hidden sm:inline">
                    Share your iban.bio profile
                </DialogTitle>

                <div className="relative group mt-3 mb-6">
                    <div className="absolute -inset-0.5 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl opacity-30 blur-sm group-hover:opacity-50 transition duration-500"></div>
                    <div className="relative w-full bg-background rounded-xl p-4 flex flex-col items-center text-center">
                        <div className="w-48 h-48 bg-white text-black p-2 rounded-md flex items-center justify-center overflow-hidden relative">
                            {!qrLoaded && (
                                <Loader2
                                    size={24}
                                    className="animate-spin absolute"
                                />
                            )}
                            <Image
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${shareUrl}`}
                                alt="QR Code"
                                className="w-full h-full object-contain mix-blend-multiply opacity-90"
                                width={512}
                                height={512}
                                onLoad={() => setQrLoaded(true)}
                            />
                        </div>
                        <p className="text-xs text-zinc-400 mt-2.5 font-medium uppercase tracking-wider">
                            @{username}
                        </p>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-1.5 flex items-center gap-2 mb-6">
                    <div className="flex-1 px-3 py-2 overflow-hidden">
                        <p className="text-sm text-zinc-500 font-medium truncate">
                            iban.bio/{username}
                            {shareToken ? `?shareToken=${shareToken}` : ''}
                        </p>
                    </div>
                    <button
                        onClick={handleCopy}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                            copied
                                ? 'bg-green-500/20 text-green-500'
                                : 'bg-zinc-800 text-zinc-400 hover:bg-white hover:text-black'
                        }`}>
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <a
                        href={`https://wa.me/?text=${encodeURIComponent(
                            shareUrl,
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-col items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/20">
                        <MessageCircle size={20} />
                        <span className="text-xs font-medium uppercase tracking-widest">
                            WhatsApp
                        </span>
                    </a>

                    <a
                        href={`https://x.com/intent/tweet?text=${encodeURIComponent(
                            `📱🔥 Check out my financal tree on iban.bio/${username}!`,
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-col items-center justify-center gap-2 py-3 rounded-xl bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-colors border border-[#1DA1F2]/20">
                        <XCircleIcon size={20} />
                        <span className="text-xs font-medium uppercase tracking-widest">
                            X.com
                        </span>
                    </a>

                    <button
                        onClick={() => navigator.share?.({ url: shareUrl })}
                        className="flex flex-col items-center justify-center gap-2 py-3 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors border border-zinc-700">
                        <Smartphone size={20} />
                        <span className="text-xs font-medium uppercase tracking-widest">
                            Other
                        </span>
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
