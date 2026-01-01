'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export const UseCaseCard = ({
    title,
    sub,
    icon,
    color,
}: {
    title: string;
    sub: string;
    icon: React.ReactNode;
    color: string;
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setCopied(true);
        if (
            typeof window !== 'undefined' &&
            window.navigator &&
            window.navigator.vibrate
        ) {
            window.navigator.vibrate(50);
        }
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            onClick={handleCopy}
            className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 cursor-pointer transition-all active:scale-95 select-none overflow-hidden backdrop-blur-sm">
            <div
                className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
            />
            <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                    <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg`}>
                        {icon}
                    </div>
                    <div>
                        <p className="font-bold text-white text-sm">{title}</p>
                        <p className="text-xs text-zinc-400">{sub}</p>
                    </div>
                </div>
                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        copied
                            ? 'bg-green-500 text-white'
                            : 'bg-zinc-800 text-zinc-400'
                    }`}>
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                </div>
            </div>
        </div>
    );
};
