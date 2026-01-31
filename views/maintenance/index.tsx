import { Button } from '@/components/ui/button';
import { Routes } from '@/core/constants';
import { Home, Wrench } from 'lucide-react';
import Link from 'next/link';

export function MaintenancePage() {
    return (
        <div className="container pt-[80px] min-h-screen flex flex-col justify-center">
            <div className="relative max-w-sm w-full text-center mx-auto">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center">
                        <Wrench
                            size={48}
                            className="text-indigo-500"
                        />
                    </div>
                </div>

                {/* Texts */}
                <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 mb-4 tracking-tighter">
                    Under Maintenance
                </h1>
                <h2 className="text-xl font-bold text-white mb-3">
                    We&apos;ll Be Back Soon
                </h2>
                <p className="text-zinc-400 mb-10 leading-relaxed text-sm">
                    We&apos;re currently performing scheduled maintenance to
                    improve your experience. We&apos;ll be back online shortly.
                    Thank you for your patience.
                </p>

                <div className="flex flex-col gap-4">
                    <Link
                        href={Routes.ROOT}
                        className="w-full group">
                        <Button
                            size="lg"
                            className="w-full">
                            <Home size={18} /> Try Again
                        </Button>
                    </Link>
                </div>

                <div className="mt-8 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                    <p className="text-xs text-zinc-500 mb-2">
                        Need urgent assistance?
                    </p>
                    <Link
                        href="mailto:info@iban.bio"
                        className="text-sm text-indigo-400 hover:text-indigo-300 underline transition-colors font-medium">
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
}
