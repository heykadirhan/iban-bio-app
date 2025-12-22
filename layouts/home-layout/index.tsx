'use client';

import { Button } from '@/components/ui/button';
import { Routes } from '@/core/constants';
import { cn } from '@/lib/utils';
import { Search, Sparkles } from 'lucide-react';
import Image from 'next/image';
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
                    'fixed top-0 w-full z-50 backdrop-blur-lg border-b border-white/5 transition-all no-print',
                    isScrolled ? 'bg-[#050505]/80' : 'bg-transparent',
                )}>
                <div className="container">
                    <div className="h-20 flex items-center justify-between gap-2">
                        <Link
                            href={Routes.ROOT}
                            className="flex items-center gap-2 cursor-pointer">
                            <Image
                                src="/img/logo.svg"
                                alt="iban.bio Logo"
                                width={120}
                                height={40}
                                className="hidden sm:inline"
                            />
                            <Image
                                src="/img/logo-icon.png"
                                alt="iban.bio Logo Icon"
                                width={32}
                                height={32}
                                className="sm:hidden"
                            />
                        </Link>

                        <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
                            <Link
                                href={Routes.ROOT + '#search-pay'}
                                className="hover:text-white transition-colors">
                                Search & Pay
                            </Link>
                            <Link
                                href={Routes.ROOT + '#features'}
                                className="hover:text-white transition-colors">
                                Features
                            </Link>
                            <Link
                                href={Routes.ROOT + '#faq'}
                                className="hover:text-white transition-colors">
                                FAQ
                            </Link>
                        </div>

                        <div className="flex gap-4">
                            <Link href={Routes.SEARCH}>
                                <Button
                                    variant="secondary"
                                    className="rounded-full font-bold">
                                    <Search size={14} />
                                    Find User
                                </Button>
                            </Link>
                            <Link href={Routes.GET_STARTED}>
                                <Button className="rounded-full font-bold">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {children}

            <footer className="py-12 border-t border-white/5 bg-[#020202] text-zinc-500 text-sm">
                <div className="container">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2 text-white opacity-80">
                            <Sparkles size={20} />
                            <span className="font-bold text-lg">iban.bio</span>
                        </div>

                        <div className="flex gap-8">
                            <Link
                                href={Routes.PRIVACY}
                                className="hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link
                                href={Routes.TERMS}
                                className="hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <Link
                                href="mailto:info@iban.bio"
                                className="hover:text-white transition-colors">
                                Contact Us
                            </Link>
                        </div>

                        <p>© {new Date().getFullYear()} iban.bio</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
