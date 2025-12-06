'use client';

import { useState } from 'react';
import { Copy, Check, QrCode, Share, Shield } from 'lucide-react';

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
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[20%] w-[400px] h-[400px] bg-purple-900/20 rounded-full blur-[100px]" />
                <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] bg-blue-900/10 rounded-full blur-[80px]" />
            </div>

            <div className="relative max-w-md mx-auto min-h-screen flex flex-col">
                <div className="flex justify-between items-center p-6 z-10">
                    <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
                        <span className="font-bold text-sm">SP</span>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 hover:bg-zinc-800 transition">
                        <Share
                            size={18}
                            className="text-zinc-400"
                        />
                    </button>
                </div>

                <div className="px-6 pb-8 text-center z-10">
                    <div className="relative inline-block">
                        <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-purple-500 via-blue-500 to-transparent">
                            <img
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=80"
                                className="w-full h-full rounded-full object-cover border-4 border-[#050505]"
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full border-4 border-[#050505]">
                            <Shield
                                size={12}
                                fill="currentColor"
                            />
                        </div>
                    </div>

                    <h1 className="mt-4 text-2xl font-bold">
                        {profile.displayName}
                    </h1>
                    <p className="text-zinc-500 text-sm mt-1">
                        @{profile.username} • ${profile.title}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 bg-zinc-900/50 backdrop-blur border border-zinc-800 px-4 py-2 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-medium text-zinc-300">
                            İş alımları açık
                        </span>
                    </div>
                </div>

                <div className="flex-1 bg-zinc-900/30 backdrop-blur-2xl rounded-t-[40px] border-t border-white/5 p-6 space-y-4">
                    <div className="flex justify-between items-end mb-2 px-2">
                        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">
                            Cüzdanlar
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

                                        <span className="font-mono text-xs text-zinc-400 bg-black/30 px-2 py-1 rounded inline-block max-w-[180px] truncate group-hover:text-white transition-colors">
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

                    <button className="w-full py-4 mt-4 border border-dashed border-zinc-700 text-zinc-500 rounded-2xl hover:bg-zinc-900/50 hover:border-zinc-500 hover:text-zinc-300 transition-all text-sm font-medium">
                        + Yeni Kripto/IBAN Ekle
                    </button>
                </div>
            </div>
        </div>
    );
}
