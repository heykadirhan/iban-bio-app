import { ArrowRight, Globe, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Routes } from '@/core/constants';
import { Button } from '@/components/ui/button';

export function SectionCta() {
    return (
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
                                <ShieldCheck size={16} /> Encrypted (AES-256)
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                                <Globe size={16} /> Global
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
