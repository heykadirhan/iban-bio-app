import { ArrowRight, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { Routes } from '@/core/constants';
import { PhoneSearchClient } from './client-sections';

export function SectionSearchPay() {
    return (
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
                            Need to send money to a friend or freelancer? Just
                            enter their phone number to find their iban.bio
                            profile and payment details instantly.
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
                                <PhoneSearchClient />
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
    );
}
