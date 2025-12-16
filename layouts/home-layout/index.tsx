'use client';

import { Button } from '@/components/ui/button';
import { Routes } from '@/core/constants';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function HomeLayout({ children }: { children: React.ReactNode }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 overflow-x-hidden">
            <nav
                className={cn(
                    'fixed top-0 w-full z-50 backdrop-blur-lg border-b border-white/5 transition-all',
                    isScrolled ? 'bg-[#050505]/80' : 'bg-transparent',
                )}>
                <div className="container">
                    <div className="h-20 flex items-center justify-between">
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => window.scrollTo(0, 0)}>
                            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <Sparkles
                                    size={16}
                                    className="text-white"
                                />
                            </div>
                            <span className="font-bold text-xl tracking-tight">
                                iban.bio
                            </span>
                        </div>

                        <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
                            <a
                                href="#features"
                                className="hover:text-white transition-colors">
                                Features
                            </a>
                            <a
                                href="#how-it-works"
                                className="hover:text-white transition-colors">
                                How it Works
                            </a>
                            <a
                                href="#faq"
                                className="hover:text-white transition-colors">
                                FAQ
                            </a>
                        </div>

                        <div className="flex gap-4">
                            <Link href={Routes.GET_STARTED}>
                                <Button variant="ghost">Sign in</Button>
                            </Link>
                            <Link href={Routes.GET_STARTED}>
                                <Button variant="primary">Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {children}

            <footer className="py-12 border-t border-white/5 bg-[#020202] text-zinc-500 text-sm">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 text-white opacity-80">
                        <Sparkles size={20} />
                        <span className="font-bold text-lg">iban.bio</span>
                    </div>

                    <div className="flex gap-8">
                        <a
                            href="#"
                            className="hover:text-white transition-colors">
                            Privacy
                        </a>
                        <a
                            href="#"
                            className="hover:text-white transition-colors">
                            Terms
                        </a>
                        <a
                            href="#"
                            className="hover:text-white transition-colors">
                            Twitter
                        </a>
                    </div>

                    <p>© {new Date().getFullYear()} iban.bio</p>
                </div>
            </footer>
        </div>
    );
}
