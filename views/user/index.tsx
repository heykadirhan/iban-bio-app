'use client';

import { useState } from 'react';
import {
    Copy,
    Check,
    QrCode,
    Share,
    Shield,
    ArrowRight,
    ShieldCheck,
    Sparkles,
    PlusCircle,
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Routes } from '@/core/constants';
import { Button } from '@/components/ui/button';
import { ModalShare } from '@/components/modal-share';

const METHODS = [
    {
        id: '1',
        title: 'İş Bankası',
        sub: 'Maaş Hesabı',
        val: 'TR12 0006 4000 0123 4567 8901 23',
        type: 'IBAN',
        color: 'from-blue-600 to-blue-800',
    },
    {
        id: '2',
        title: 'Binance',
        sub: 'USDT (TRC20)',
        val: 'TF7y...3d9z',
        type: 'CRYPTO',
        color: 'from-yellow-500 to-amber-600',
    },
    {
        id: '3',
        title: 'Papara',
        sub: 'Hızlı Ödeme',
        val: '1552366211',
        type: 'WALLET',
        color: 'from-pink-600 to-rose-600',
    },
];

export function UserPage({
    user: { profile, paymentMethods },
}: {
    user: { profile: any; paymentMethods: any[] };
}) {
    const session = useSession();
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <>
            <div className="px-6 pb-8 text-center z-10">
                <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-purple-500 via-blue-500 to-transparent">
                        <Image
                            src={profile.avatarUrl}
                            alt={`${profile.displayName}'s avatar`}
                            width={96}
                            height={96}
                            className="w-full h-full rounded-full object-cover border-4 border-background"
                        />
                    </div>
                    {/* TODO: Add icon based on user's persona */}
                    {/* <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full border-4 border-[#050505]">
                            <Shield
                                size={12}
                                fill="currentColor"
                            />
                        </div> */}
                </div>

                <div className="mt-3 flex justify-center items-center gap-3">
                    <h1 className="text-2xl font-bold">
                        {profile.displayName}
                    </h1>
                    <button
                        onClick={() => setIsShareModalOpen(true)}
                        className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 hover:bg-zinc-800 transition">
                        <Share
                            size={16}
                            className="text-zinc-400"
                        />
                    </button>
                </div>
                <p className="text-zinc-500 text-sm mt-1">
                    @{profile.username}{' '}
                    {profile.title ? '• ' + profile.title : ''}
                </p>
                <p
                    className={cn(
                        'mt-2 text-sm',
                        profile.bio ? 'text-zinc-400' : 'italic text-zinc-600',
                    )}>
                    {profile.bio || 'This user has not added a bio yet.'}
                </p>
            </div>

            <div className="flex-1 bg-zinc-900/30 backdrop-blur-2xl rounded-t-[40px] border-t border-white/5 p-6 space-y-4">
                <div className="flex justify-between items-end mb-3 px-2">
                    <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">
                        Payment Methods
                    </h3>
                </div>

                {METHODS.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleCopy(item.val, item.id)}
                        className="group relative bg-[#1a1a1a] hover:bg-[#222] border border-white/5 rounded-2xl p-4 transition-all duration-300 active:scale-[0.98] cursor-pointer overflow-hidden">
                        <div
                            className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                        />

                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-4">
                                <div
                                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}>
                                    <span className="font-bold text-lg">
                                        {item.title[0]}
                                    </span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-base font-semibold text-white group-hover:text-blue-200 transition-colors">
                                        {item.title}
                                    </span>
                                    <span className="text-xs text-zinc-500 mb-1">
                                        {item.sub}
                                    </span>

                                    <span className="text-xs text-zinc-400 bg-black/30 px-2 py-1 rounded inline-block max-w-[180px] truncate group-hover:text-white transition-colors">
                                        {item.val}
                                    </span>
                                </div>
                            </div>

                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                    copiedId === item.id
                                        ? 'bg-green-500/20 text-green-500'
                                        : 'bg-zinc-800 text-zinc-400 group-hover:bg-white group-hover:text-black'
                                }`}>
                                {copiedId === item.id ? (
                                    <Check size={18} />
                                ) : (
                                    <Copy size={18} />
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {session.data?.user?.username === profile.username && (
                    <Link href={Routes.DASHBOARD}>
                        <button className="w-full py-4 my-4 border flex items-center justify-center gap-3 border-dashed border-zinc-700 text-zinc-500 rounded-2xl hover:bg-zinc-900/50 hover:border-zinc-500 hover:text-zinc-300 transition-all text-sm font-medium">
                            <PlusCircle size={18} /> Add New Payment Method
                        </button>
                    </Link>
                )}
            </div>
            {session.status === 'unauthenticated' && (
                <div className="mt-8 mb-12 relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-50 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200"></div>

                    <div className="relative flex flex-col justify-between p-6 bg-[#0a0a0a] rounded-2xl border border-white/10 shadow-2xl">
                        <div className="flex items-start gap-4 mb-4 sm:mb-0">
                            <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/5">
                                <Sparkles
                                    className="text-blue-400"
                                    size={24}
                                />
                            </div>

                            <div className="text-left">
                                <h3 className="text-lg font-bold text-white leading-tight">
                                    Create Your iban.bio Link Today!
                                </h3>
                                <p className="text-sm text-zinc-400 mt-1 leading-relaxed max-w-[250px]">
                                    Share your IBAN and Crypto addresses
                                    securely in one link. Free.
                                </p>

                                <div className="flex items-center gap-1.5 mt-3">
                                    <ShieldCheck
                                        size={12}
                                        className="text-green-500"
                                    />
                                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                                        256-Bit Crypted
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Sağ Taraf: Buton */}
                        <Link
                            href={Routes.GET_STARTED}
                            className="w-full mt-2">
                            <Button
                                className="w-full"
                                size="lg"
                                variant="primary">
                                Create Your Free Link
                                <ArrowRight
                                    size={16}
                                    className="group-hover/btn:translate-x-1 transition-transform"
                                />
                            </Button>
                        </Link>
                    </div>
                </div>
            )}

            <ModalShare
                isOpen={isShareModalOpen}
                username={profile.username}
                onClose={() => setIsShareModalOpen(false)}
            />
        </>
    );
}
