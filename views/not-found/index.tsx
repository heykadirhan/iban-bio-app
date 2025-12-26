import { Button } from '@/components/ui/button';
import { Routes } from '@/core/constants';
import { Home, Search, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export function NotFoundPage() {
    return (
        <div className="container pt-[80px] min-h-screen flex flex-col justify-center">
            <div className="relative max-w-sm w-full text-center mx-auto">
                {/* Metinler */}
                <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 mb-2 tracking-tighter">
                    404
                </h1>
                <h2 className="text-2xl font-bold text-white mb-3">
                    Page Not Found
                </h2>
                <p className="text-zinc-400 mb-10 leading-relaxed text-sm">
                    The page you are looking for may have been deleted, moved,
                    or never existed. You might have clicked on a wrong link.
                </p>

                <div className="flex flex-col gap-4">
                    <Link
                        href={Routes.ROOT}
                        className="w-full group">
                        <Button
                            size="lg"
                            className="w-full">
                            <Home size={18} /> Return to Home
                        </Button>
                    </Link>

                    <Link
                        href={Routes.SEARCH}
                        className="w-full">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="w-full">
                            <Search size={18} /> Find User
                        </Button>
                    </Link>
                </div>

                <div className="mt-2">
                    <span className="text-xs text-zinc-600">
                        You think there is an error?{' '}
                        <Link
                            href="mailto:info@iban.bio"
                            className="text-zinc-500 hover:text-white underline transition-colors">
                            Report Us
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}
