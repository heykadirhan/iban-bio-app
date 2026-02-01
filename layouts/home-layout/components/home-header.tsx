'use client';
import { Button } from '@/components/ui/button';
import { Routes } from '@/core/constants';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function HomeHeader() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 20);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
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
                            priority
                        />
                        <Image
                            src="/img/logo-icon.png"
                            alt="iban.bio Logo Icon"
                            width={32}
                            height={32}
                            className="sm:hidden"
                            priority
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
    );
}
