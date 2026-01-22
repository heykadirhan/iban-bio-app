'use client';
import {
    BriefcaseIcon,
    CheckCircle2,
    HeartIcon,
    User,
    Zap,
} from 'lucide-react';
import { useState } from 'react';
import { UseCaseCard } from './use-case-card';

type UseCaseType = 'personal' | 'freelancer' | 'trader' | 'creator';

export function SectionUseCases() {
    const [activeUseCase, setActiveUseCase] = useState<UseCaseType>('personal');

    return (
        <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
            <div className="container">
                <div className="flex flex-col xl:flex-row gap-8 xl:gap-16">
                    <div className="flex flex-col items-center xl:items-start mb-12 gap-6">
                        <div className="text-center lg:text-left">
                            <h2 className="text-3xl lg:text-4xl font-bold mb-2">
                                Built for Everyone
                            </h2>
                            <p className="text-zinc-400">
                                Tailored experiences for different needs.
                            </p>
                        </div>

                        {/* Custom Tabs */}
                        <div className="flex p-1 bg-zinc-900 rounded-xl border border-white/5">
                            {[
                                'personal',
                                'freelancer',
                                'trader',
                                'creator',
                            ].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() =>
                                        setActiveUseCase(tab as UseCaseType)
                                    }
                                    className={`px-6 py-2.5 rounded-lg text-sm font-bold capitalize transition-all ${
                                        activeUseCase === tab
                                            ? 'bg-zinc-800 text-white shadow-sm'
                                            : 'text-zinc-500 hover:text-zinc-300'
                                    }`}>
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="glass-card xl:max-w-4xl xl:ml-auto rounded-3xl p-8 md:p-12 border border-white/10 min-h-[300px] flex flex-col md:flex-row items-center gap-12">
                        {/* Content Text */}
                        <div
                            className="flex-1 space-y-6 animate-in fade-in slide-in-from-left-4 duration-500"
                            key={activeUseCase}>
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                                {activeUseCase === 'personal' && (
                                    <User className="text-white" />
                                )}
                                {activeUseCase === 'freelancer' && (
                                    <BriefcaseIcon className="text-white" />
                                )}
                                {activeUseCase === 'trader' && (
                                    <Zap className="text-white" />
                                )}
                                {activeUseCase === 'creator' && (
                                    <HeartIcon className="text-white" />
                                )}
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold mb-2 capitalize">
                                    {activeUseCase}
                                </h3>
                                <p className="text-zinc-400 text-lg leading-relaxed">
                                    {activeUseCase === 'personal' &&
                                        'Simplify sharing your payment details with a personalized link. Perfect for friends and family to send you money quickly and securely.'}
                                    {activeUseCase === 'freelancer' &&
                                        'Stop sending PDF invoices just to share your IBAN. Send one professional link to your clients and get paid faster via Bank Transfer or Wise.'}
                                    {activeUseCase === 'trader' &&
                                        'Managing multiple wallets across different networks (ERC20, TRC20, SOL)? List them all clearly with network icons so senders never make a mistake.'}
                                    {activeUseCase === 'creator' &&
                                        'Accept donations or payments from your fans effortlessly. Put your iban.bio link in your Instagram bio, YouTube description, or Twitch panels.'}
                                </p>
                            </div>
                            <ul className="space-y-3">
                                {{
                                    personal: [
                                        'Simple Setup',
                                        'Universal Link',
                                        'Secure & Private',
                                    ],
                                    freelancer: [
                                        'Instant Copy',
                                        'Professional Appearance',
                                        'Hide Personal Phone',
                                    ],
                                    trader: [
                                        'Network Badges',
                                        'Privacy Masking',
                                        'Multi-Chain Support',
                                    ],
                                    creator: [
                                        'Mobile Optimized',
                                        'QR Code Included',
                                        'Zero Fees',
                                    ],
                                }[activeUseCase].map((i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-3 text-zinc-300">
                                        <CheckCircle2
                                            size={18}
                                            className="text-indigo-500"
                                        />
                                        <span>{i}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Visual (Contextual Card) */}
                        <div className="flex-1 w-full max-w-sm">
                            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
                                    <div className="w-12 h-12 bg-zinc-800 rounded-full"></div>
                                    <div className="flex-1 space-y-2 w-full">
                                        <div className="h-2 w-20 bg-zinc-800 rounded"></div>
                                        <div className="h-2 w-32 bg-zinc-800 rounded"></div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <UseCaseCard
                                        title={
                                            activeUseCase === 'personal'
                                                ? 'Personal Account'
                                                : activeUseCase === 'freelancer'
                                                  ? 'Business Account'
                                                  : activeUseCase === 'trader'
                                                    ? 'Binance'
                                                    : 'Patreon'
                                        }
                                        sub={
                                            activeUseCase === 'personal'
                                                ? 'USD Account'
                                                : activeUseCase === 'freelancer'
                                                  ? 'USD Invoices'
                                                  : activeUseCase === 'trader'
                                                    ? 'Deposit Address'
                                                    : 'Support Me'
                                        }
                                        icon={
                                            activeUseCase === 'personal'
                                                ? '👤'
                                                : activeUseCase === 'freelancer'
                                                  ? '🏦'
                                                  : activeUseCase === 'trader'
                                                    ? '🪙'
                                                    : '❤️'
                                        }
                                        color="from-zinc-700 to-zinc-800"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
