import {
    ShieldCheck,
    CheckCircle2,
    CreditCard,
    Wallet,
    Bitcoin,
    Search,
} from 'lucide-react';
import Link from 'next/link';
import { Routes } from '@/core/constants';
import Image from 'next/image';
import { TypingEffect } from './typing-effect';

export function SectionHero() {
    return (
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
                            payment apps into one professional, secure profile.
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

                                    <Image
                                        src="/img/app-screenshot.png"
                                        alt="iban.bio App Interface"
                                        width={1920}
                                        height={1220}
                                        priority
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
                                                <Image
                                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop"
                                                    width={40}
                                                    height={40}
                                                    className="w-full h-full rounded-full object-cover border-2 border-[#0a0a0a]"
                                                    alt="User"
                                                    loading="lazy"
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
    );
}
