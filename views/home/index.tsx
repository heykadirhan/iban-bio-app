import {
    ArrowRight,
    ShieldCheck,
    Zap,
    Globe,
    Lock,
    Smartphone,
    CheckCircle2,
    Wallet,
    CreditCard,
    Check,
    Bitcoin,
    Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Routes } from '@/core/constants';
import Image from 'next/image';
import { TypingEffect } from './components/typing-effect';
import PaymentCard from '@/components/payment-card';
import { PaymentMethodType } from '@/core/enums';
import { PhoneSearch } from './components/phone-search';
import { SectionUseCases } from './components/section-use-cases';
import { SectionFaq } from './components/section-faq';

export function HomePage() {
    return (
        <>
            <section className="relative pt-32 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container">
                    <div className="grid lg:grid-cols-2 items-center gap-16 relative z-10">
                        <div className="text-center lg:text-left">
                            <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                </span>
                                Universal Payment Profile
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
                                <TypingEffect />
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
                                    AES-256 Encrypted
                                </div>
                            </div>
                        </div>

                        <div className="relative mx-auto lg:mr-0 perspective-1000 w-full max-w-[600px] lg:max-w-none flex justify-center lg:justify-end">
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] -z-10 transform rotate-6 scale-125"></div>

                            <div className="relative z-20 animate-float mx-auto">
                                <div className="relative z-10 w-[300px] sm:w-[320px] h-[640px] bg-[#050505] rounded-[3.5rem] border-[6px] border-[#1a1a1a] ring-1 ring-white/10 shadow-[0_0_50px_-12px_rgba(79,70,229,0.3)] overflow-hidden">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-b-2xl z-30"></div>

                                    <div className="w-full h-full relative">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent z-20 pointer-events-none"></div>

                                        <img
                                            src="/img/app-screenshot.png"
                                            alt="SecurePay App Interface"
                                            className="h-[115%] sm:h-[120%] object-cover pt-6 overflow-hidden"
                                        />
                                    </div>
                                </div>

                                <div className="hidden sm:block absolute top-12 -left-12 sm:-left-48 z-20 animate-float-delayed">
                                    <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 p-4 pr-6 rounded-2xl shadow-2xl flex items-center gap-4 transform -rotate-2 hover:rotate-0 transition-transform duration-500 hover:border-green-500/30 group">
                                        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 group-hover:scale-110 transition-transform">
                                            <ShieldCheck
                                                size={24}
                                                className="text-green-500"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                                                Security
                                            </p>
                                            <p className="text-sm text-white font-bold">
                                                AES-256 Encrypted
                                            </p>
                                            <div className="flex gap-1 mt-1">
                                                <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
                                                <span className="text-[10px] text-green-500 font-medium">
                                                    Protected
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden sm:block absolute top-32 -right-8 sm:-right-48 z-0 animate-float">
                                    <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 hover:border-indigo-500/30">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                                <CreditCard size={16} />
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                                <Wallet size={16} />
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                                                <Bitcoin size={16} />
                                            </div>
                                        </div>
                                        <p className="text-xs text-zinc-400 font-medium text-center">
                                            All Assets Supported
                                        </p>
                                    </div>
                                </div>

                                <div className="hidden sm:block absolute bottom-32 -right-4 sm:-right-32 z-30 animate-float-delayed-2">
                                    <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex flex-col gap-3 transform rotate-6 border-l-4 border-l-blue-500 hover:rotate-0 transition-transform duration-500 min-w-[220px]">
                                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                                                <Search
                                                    size={12}
                                                    className="text-blue-500"
                                                />{' '}
                                                Find by Phone
                                            </span>
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-blue-500 to-indigo-500">
                                                    <img
                                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop"
                                                        className="w-full h-full rounded-full object-cover border-2 border-[#0a0a0a]"
                                                        alt="User"
                                                    />
                                                </div>
                                                <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5">
                                                    <div className="bg-green-500 w-3 h-3 rounded-full border-2 border-black"></div>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-xs text-zinc-500 font-mono mb-0.5">
                                                    +1 (555) 123-4567
                                                </p>
                                                <p className="text-sm text-white font-bold flex items-center gap-1">
                                                    Joe Doe{' '}
                                                    <CheckCircle2
                                                        size={12}
                                                        className="text-blue-500"
                                                    />
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-1 flex justify-end">
                                            <span className="text-[10px] text-blue-400 font-bold bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">
                                                Profile Found
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] -z-10 rounded-full pointer-events-none mix-blend-screen"></div>
                            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-600/10 blur-[100px] -z-10 rounded-full pointer-events-none"></div>
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] -z-10"></div>

                <div className="container">
                    <div className="glass-card rounded-[3rem] py-12 px-6 lg:px-20 lg:py-20 flex flex-col md:flex-row items-center gap-16 border border-white/10 relative">
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-primary/30 text-primary/60 text-xs font-bold mb-6">
                                <Smartphone size={12} /> Search & Pay
                            </div>
                            <h2 className="text-[32px] leading-tight lg:text-5xl font-bold mb-6 text-white">
                                No Username?
                                <br />
                                Just use their{' '}
                                <span className="text-primary underline decoration-primary/30 decoration-4 underline-offset-2">
                                    number.
                                </span>
                            </h2>
                            <p className="text-lg text-zinc-400 mb-8 max-w-md">
                                Need to send money to a friend or freelancer?
                                Just enter their phone number to find their
                                iban.bio profile and payment details instantly.
                            </p>
                            <Link href={Routes.SEARCH}>
                                <button className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-primary pb-1 hover:text-primary/60 transition-colors">
                                    Try searching now <ArrowRight size={16} />
                                </button>
                            </Link>
                        </div>

                        <div className="flex-1 w-full max-w-md">
                            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-3xl p-6 shadow-2xl relative group">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/30 transition-colors"></div>

                                <div className="mb-6">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 block">
                                        Find Profile
                                    </label>
                                    <PhoneSearch />
                                </div>

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

            <SectionUseCases />

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

                        <div className="md:col-span-2 glass-card rounded-3xl p-10 flex flex-col md:flex-row items-center gap-8 group">
                            <div className="flex-1">
                                <div className="w-12 h-12 bg-primary/20 text-primary/60 rounded-2xl flex items-center justify-center mb-6">
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

            <SectionFaq />

            <section className="py-20">
                <div className="container">
                    <div className="max-w-5xl mx-auto bg-gradient-to-br from-indigo-900 via-[#0a0a0a] to-[#0a0a0a] rounded-[3rem] border border-indigo-500/30 p-12 lg:p-20 text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

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
                                    (AES-256)
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
