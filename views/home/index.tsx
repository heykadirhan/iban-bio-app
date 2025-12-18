'use client';
import React, { useState, useEffect } from 'react';
import {
    ArrowRight,
    ShieldCheck,
    Zap,
    Globe,
    Lock,
    Smartphone,
    CheckCircle2,
    Copy,
    Check,
    ChevronDown,
    Wallet,
    CreditCard,
    Bitcoin,
    Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Routes } from '@/core/constants';
import { createRoute } from '@/core/utils';
import InputPhone from '@/components/input-phone';
import Image from 'next/image';

type UseCaseType = 'freelancer' | 'trader' | 'creator';

const DemoCard = ({
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

const HeroVisual = () => {
    return (
        <div className="relative w-full h-[500px] flex items-center justify-center perspective-1000">
            {/* Ambient Glow Behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/30 rounded-full blur-[80px] animate-pulse-slow"></div>

            {/* --- CARD 3: Crypto (Back/Right) --- */}
            <div className="absolute top-20 right-0 lg:right-10 w-64 h-40 bg-[#111] border border-white/10 rounded-2xl p-4 shadow-2xl transform rotate-[15deg] translate-z-[-50px] opacity-60 hover:opacity-100 transition-all duration-500 animate-float-delayed backdrop-blur-md">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                        <Zap size={20} />
                    </div>
                    <div>
                        <div className="h-2 w-16 bg-white/20 rounded mb-1"></div>
                        <div className="h-2 w-10 bg-white/10 rounded"></div>
                    </div>
                </div>
                <div className="space-y-2 mt-6">
                    <div className="h-2 w-full bg-white/10 rounded"></div>
                    <div className="h-2 w-2/3 bg-white/10 rounded"></div>
                </div>
            </div>

            {/* --- CARD 2: Bank (Back/Left) --- */}
            <div className="absolute bottom-20 left-0 lg:left-10 w-64 h-40 bg-[#151515] border border-white/10 rounded-2xl p-4 shadow-2xl transform -rotate-[12deg] translate-z-[-30px] opacity-70 hover:opacity-100 transition-all duration-500 animate-float backdrop-blur-md">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-8 h-8 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center">
                        <CreditCard size={18} />
                    </div>
                    <div className="text-[10px] bg-white/5 px-2 py-1 rounded text-zinc-500">
                        IBAN
                    </div>
                </div>
                <div className="text-zinc-500 font-mono text-xs mb-1">
                    TR12 **** **** 56
                </div>
                <div className="text-white font-bold">Garanti BBVA</div>
            </div>

            {/* --- CARD 1: MAIN PROFILE (Front/Center) --- */}
            <div className="relative z-10 w-72 lg:w-80 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-500 group">
                {/* Top Notch Effect */}
                <div className="flex justify-between items-center mb-6">
                    <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-indigo-500 to-purple-500">
                        <Image
                            src="/img/user.jpg"
                            className="w-full h-full rounded-full border-2 border-[#0a0a0a] object-cover"
                            alt="Avatar"
                            width={128}
                            height={128}
                        />
                    </div>
                    <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20 flex items-center gap-1">
                        <CheckCircle2 size={12} /> Verified
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">
                    Alex Morgan
                </h3>
                <p className="text-indigo-400 text-sm font-medium mb-6">
                    @alex
                </p>

                {/* Mini Cards inside Main Card */}
                <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-500 flex items-center justify-center">
                            <Bitcoin size={16} />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-bold text-zinc-200">
                                Bitcoin
                            </p>
                            <p className="text-[10px] text-zinc-500">
                                BTC Network
                            </p>
                        </div>
                        <Copy
                            size={14}
                            className="text-zinc-600"
                        />
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-500 flex items-center justify-center">
                            <Smartphone size={16} />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-bold text-zinc-200">
                                PayPal
                            </p>
                            <p className="text-[10px] text-zinc-500">
                                1239****92
                            </p>
                        </div>
                        <Copy
                            size={14}
                            className="text-zinc-600"
                        />
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-6">
                    <Link href={Routes.GET_STARTED}>
                        <Button
                            className="w-full font-semibold"
                            size="lg">
                            Create Your iban.bio
                            <ArrowRight />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-br from-purple-600 to-transparent opacity-20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-tl from-indigo-600 to-transparent opacity-20 rounded-full blur-2xl animate-pulse"></div>
        </div>
    );
};

const FaqItem = ({
    question,
    answer,
}: {
    question: string;
    answer: string;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-white/10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none">
                <span className="text-lg font-medium text-zinc-200">
                    {question}
                </span>
                <ChevronDown
                    className={`text-zinc-500 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-40 pb-6' : 'max-h-0'
                }`}>
                <p className="text-zinc-400 leading-relaxed">{answer}</p>
            </div>
        </div>
    );
};

export function HomePage() {
    const [phoneSearch, setPhoneSearch] = useState('');
    const [phoneSearchCountry, setPhoneSearchCountry] = useState('');
    const [typedName, setTypedName] = useState('');
    const targetName = 'alex';

    const [activeUseCase, setActiveUseCase] =
        useState<UseCaseType>('freelancer');

    useEffect(() => {
        let i = 0;
        let interval: ReturnType<typeof setInterval>;

        const startTyping = () => {
            interval = setInterval(() => {
                i++;
                setTypedName(targetName.slice(0, i));

                if (i === targetName.length) {
                    clearInterval(interval);

                    setTimeout(() => {
                        i = 0;
                        setTypedName('');
                        startTyping();
                    }, 2000);
                }
            }, 300);
        };

        startTyping();

        return () => clearInterval(interval);
    }, [targetName]);

    return (
        <>
            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-16 relative z-10">
                        {/* Text */}
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-400 text-xs font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                </span>
                                The New Standard for Sharing Payment Info
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                                Your Financial ID. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
                                    One Secure Link.
                                </span>
                            </h1>

                            <p className="text-lg text-zinc-400 mb-10 max-w-lg text-center lg:text-left leading-relaxed mx-auto lg:!mx-0">
                                Stop sharing raw IBANs and scattered wallet
                                addresses. Consolidate your banking, crypto, and
                                payment apps into one professional, secure
                                profile.
                            </p>

                            <div className="mx-auto lg:!mx-0 glass-card rounded-2xl p-2 flex items-center gap-2 max-w-md text-center lg:text-left mb-10 shadow-2xl shadow-indigo-900/20">
                                <span className="pl-4 text-zinc-500 font-mono text-base">
                                    iban.bio/
                                </span>
                                <span className="text-white text-left font-mono font-bold text-lg relative">
                                    {typedName}
                                    <span className="absolute -right-1 top-0 h-full w-0.5 bg-indigo-500 animate-blink"></span>
                                </span>
                                <Link
                                    href={Routes.GET_STARTED}
                                    className="ml-auto">
                                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-600/20">
                                        Claim URL
                                    </button>
                                </Link>
                            </div>

                            <div className="flex items-center justify-center flex-wrap lg:justify-start gap-8 text-sm font-medium text-zinc-500">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2
                                        size={16}
                                        className="text-green-500"
                                    />{' '}
                                    Free Forever
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2
                                        size={16}
                                        className="text-green-500"
                                    />{' '}
                                    No Credit Card
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2
                                        size={16}
                                        className="text-green-500"
                                    />{' '}
                                    Encrypted Data
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 relative">
                            <HeroVisual />
                        </div>
                    </div>
                </div>
            </section>

            <div className="py-12 border-y border-white/5 bg-white/[0.02] overflow-hidden relative">
                <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#050505] to-transparent z-10"></div>

                <div className="flex gap-16 items-center animate-scroll whitespace-nowrap min-w-full">
                    {[
                        'Chase',
                        'Binance',
                        'Wise',
                        'PayPal',
                        'Revolut',
                        'Stripe',
                        'Coinbase',
                        'Wells Fargo',
                        'Metamask',
                        'Venmo',
                    ].map((brand, i) => (
                        <span
                            key={i}
                            className="text-2xl font-bold text-zinc-600 uppercase tracking-widest hover:text-white transition-colors cursor-default">
                            {brand}
                        </span>
                    ))}
                    {[
                        'Chase',
                        'Binance',
                        'Wise',
                        'PayPal',
                        'Revolut',
                        'Stripe',
                        'Coinbase',
                        'Wells Fargo',
                        'Metamask',
                        'Venmo',
                    ].map((brand, i) => (
                        <span
                            key={`dup-${i}`}
                            className="text-2xl font-bold text-zinc-600 uppercase tracking-widest hover:text-white transition-colors cursor-default">
                            {brand}
                        </span>
                    ))}
                </div>
            </div>

            <section
                id="search-pay"
                className="relative py-24">
                {/* Decorative Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] -z-10"></div>

                <div className="container">
                    <div className="glass-card rounded-[3rem] p-12 lg:p-20 flex flex-col md:flex-row items-center gap-16 border border-white/10 relative">
                        {/* Text Side */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-bold mb-6">
                                <Smartphone size={12} /> Search & Pay
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
                                No Username?
                                <br />
                                Just use their{' '}
                                <span className="text-blue-500">Number.</span>
                            </h2>
                            <p className="text-lg text-zinc-400 mb-8 max-w-md">
                                Need to send money to a friend or freelancer?
                                Just enter their phone number to find their
                                iban.bio profile and payment details instantly.
                            </p>
                            <Link href={Routes.SEARCH}>
                                <button className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-blue-500 pb-1 hover:text-blue-400 transition-colors">
                                    Try searching now <ArrowRight size={16} />
                                </button>
                            </Link>
                        </div>

                        {/* Interactive Component Side */}
                        <div className="flex-1 w-full max-w-md">
                            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-3xl p-6 shadow-2xl relative group">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/30 transition-colors"></div>

                                <div className="mb-6">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 block">
                                        Find Profile
                                    </label>
                                    <InputPhone
                                        onPhoneChange={(val) =>
                                            setPhoneSearch(val)
                                        }
                                        onCountryChange={(val) =>
                                            setPhoneSearchCountry(val)
                                        }
                                        value={phoneSearch}
                                        suffix={
                                            <Link
                                                href={createRoute({
                                                    path: Routes.SEARCH,
                                                    searchParams: {
                                                        phone: phoneSearch.replaceAll(
                                                            ' ',
                                                            '',
                                                        ),
                                                        country:
                                                            phoneSearchCountry,
                                                    },
                                                })}>
                                                <Button
                                                    type="submit"
                                                    size="icon"
                                                    variant="primary">
                                                    <Search size={16} />
                                                </Button>
                                            </Link>
                                        }
                                    />
                                </div>

                                {/* Mock Result Animation */}
                                <div className="bg-zinc-900/50 rounded-xl p-4 flex items-center gap-4 opacity-60 group-hover:opacity-100 transition-opacity">
                                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                                        <Smartphone
                                            size={20}
                                            className="text-zinc-500"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-3 w-24 bg-zinc-800 rounded mb-2"></div>
                                        <div className="h-2 w-16 bg-zinc-800/50 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- HOW IT WORKS (STEPS) --- */}
            <section
                id="how-it-works"
                className="py-24">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                            Get Paid in 3 Steps
                        </h2>
                        <p className="text-zinc-400">
                            Setup takes less than 60 seconds.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Claim Username',
                                desc: 'Sign up with your phone number and secure your unique URL.',
                                icon: UserLinkIcon,
                            },
                            {
                                title: 'Add Assets',
                                desc: 'Input your IBANs, crypto addresses, or payment links.',
                                icon: Wallet,
                            },
                            {
                                title: 'Get Paid',
                                desc: 'Share your link. People can copy details with one click.',
                                icon: CheckCircle2,
                            },
                        ].map((step, i) => (
                            <div
                                key={i}
                                className="glass-card p-8 rounded-3xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl text-white group-hover:scale-110 transition-transform duration-500">
                                    {i + 1}
                                </div>
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-colors">
                                    <step.icon className="text-white group-hover:text-indigo-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- USE CASES (INTERACTIVE TABS) --- */}
            <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
                <div className="container">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl lg:text-4xl font-bold mb-2">
                                Built for Everyone
                            </h2>
                            <p className="text-zinc-400">
                                Tailored experiences for different needs.
                            </p>
                        </div>

                        {/* Custom Tabs */}
                        <div className="flex p-1 bg-zinc-900 rounded-xl border border-white/5">
                            {['freelancer', 'trader', 'creator'].map((tab) => (
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
                    <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10 min-h-[300px] flex flex-col md:flex-row items-center gap-12">
                        {/* Content Text */}
                        <div
                            className="flex-1 space-y-6 animate-in fade-in slide-in-from-left-4 duration-500"
                            key={activeUseCase}>
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
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
                                    <div className="space-y-2 w-full">
                                        <div className="h-2 w-20 bg-zinc-800 rounded"></div>
                                        <div className="h-2 w-32 bg-zinc-800 rounded"></div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <DemoCard
                                        title={
                                            activeUseCase === 'freelancer'
                                                ? 'Business Account'
                                                : activeUseCase === 'trader'
                                                ? 'Binance'
                                                : 'Patreon'
                                        }
                                        sub={
                                            activeUseCase === 'freelancer'
                                                ? 'USD Invoices'
                                                : activeUseCase === 'trader'
                                                ? 'Deposit Address'
                                                : 'Support Me'
                                        }
                                        icon={
                                            activeUseCase === 'freelancer'
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
            </section>

            {/* --- BENTO FEATURES --- */}
            <section
                id="features"
                className="py-24">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                            Everything You Need
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Feature: Privacy */}
                        <div className="md:col-span-2 glass-card rounded-3xl p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-10 opacity-10 transition-transform group-hover:scale-110 duration-700">
                                <Lock size={200} />
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-6">
                                    <ShieldCheck />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">
                                    Smart Privacy Masking
                                </h3>
                                <p className="text-zinc-400 max-w-md">
                                    Your IBANs and wallet addresses are masked
                                    by default (`TR12 **** 56`). They only
                                    reveal when a real human clicks to copy,
                                    protecting you from web scrapers and bots.
                                </p>
                            </div>
                        </div>

                        {/* Feature: Mobile */}
                        <div className="glass-card rounded-3xl p-10 group">
                            <div className="w-12 h-12 bg-pink-500/20 text-pink-400 rounded-2xl flex items-center justify-center mb-6">
                                <Smartphone />
                            </div>
                            <h3 className="text-xl font-bold mb-3">
                                Mobile Native
                            </h3>
                            <p className="text-zinc-400 text-sm">
                                Designed for the thumbs. Works perfectly inside
                                Instagram, TikTok, and WhatsApp browsers.
                            </p>
                        </div>

                        {/* Feature: Crypto */}
                        <div className="glass-card rounded-3xl p-10 group">
                            <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-2xl flex items-center justify-center mb-6">
                                <Zap />
                            </div>
                            <h3 className="text-xl font-bold mb-3">
                                Crypto Ready
                            </h3>
                            <p className="text-zinc-400 text-sm">
                                Support for all major chains. Visual indicators
                                for ERC20, TRC20, BEP20 to prevent lost funds.
                            </p>
                        </div>

                        {/* Feature: Global */}
                        <div className="md:col-span-2 glass-card rounded-3xl p-10 flex flex-col md:flex-row items-center gap-8 group">
                            <div className="flex-1">
                                <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                                    <Globe />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">
                                    Borderless Payments
                                </h3>
                                <p className="text-zinc-400">
                                    Whether you use Wise, Revolut, or a local
                                    bank, iban.bio unifies them all. Share one
                                    link with clients anywhere in the world.
                                </p>
                            </div>
                            {/* Abstract Map Viz */}
                            <div className="w-full max-w-xs h-32 bg-zinc-900 rounded-xl border border-white/5 relative overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity">
                                <div className="absolute inset-0 grid grid-cols-6 gap-1 p-2">
                                    {[...Array(24)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`rounded-sm ${
                                                [3, 7, 12, 15, 22].includes(i)
                                                    ? 'bg-indigo-500 animate-pulse'
                                                    : 'bg-zinc-800'
                                            }`}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FAQ SECTION --- */}
            <section
                id="faq"
                className="py-24 px-6 max-w-3xl mx-auto">
                <div className="container">
                    <h2 className="text-3xl font-bold mb-10 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-2">
                        <FaqItem
                            question="Is iban.bio free?"
                            answer="Yes! Our core features are 100% free. You can create a profile, add unlimited payment methods, and share your link without paying a dime."
                        />
                        <FaqItem
                            question="Is it safe to share my IBAN?"
                            answer="iban.bio adds a layer of privacy. Instead of posting your raw IBAN on social media (where bots can scrape it), you share a iban.bio link. We mask the numbers visually until a user clicks to copy."
                        />
                        <FaqItem
                            question="Can I receive payments directly?"
                            answer="No, iban.bio is a directory for your payment details. We do not process money. Users copy your details and pay you through their own banking apps. This means 0% fees for you."
                        />
                        <FaqItem
                            question="Do you support Crypto?"
                            answer="Absolutely. We are crypto-native. You can add addresses for Bitcoin, Ethereum, USDT, and specify the network (TRC20, ERC20, etc.) to ensure safe transfers."
                        />
                    </div>
                </div>
            </section>

            {/* --- CTA SECTION --- */}
            <section className="py-20">
                <div className="container">
                    <div className="max-w-5xl mx-auto bg-gradient-to-br from-indigo-900 via-[#0a0a0a] to-[#0a0a0a] rounded-[3rem] border border-indigo-500/30 p-12 lg:p-20 text-center relative overflow-hidden group">
                        {/* Animated Noise */}
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

                        {/* Glow Blob */}
                        <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-500/30 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-500/40 transition-colors duration-1000"></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">
                                Claim your username now.
                            </h2>
                            <p className="text-indigo-200 text-lg lg:text-xl mb-10 max-w-2xl mx-auto">
                                Join 10,000+ people getting paid the smart way.
                                <br />
                                No credit card required. %100 Free! Setup in 60
                                seconds.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href={Routes.GET_STARTED}>
                                    <Button
                                        size="lg"
                                        className="w-xs">
                                        Get Started for Free{' '}
                                        <ArrowRight size={20} />
                                    </Button>
                                </Link>
                            </div>

                            <div className="mt-10 flex items-center justify-center gap-8 opacity-60">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                                    <ShieldCheck size={16} /> Encrypted
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                                    <Globe size={16} /> Global
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

const UserLinkIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle
            cx="12"
            cy="7"
            r="4"
        />
    </svg>
);
const BriefcaseIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <rect
            width="20"
            height="14"
            x="2"
            y="7"
            rx="2"
            ry="2"
        />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);
const HeartIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
);
