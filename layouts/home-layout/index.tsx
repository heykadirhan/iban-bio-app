import { Routes } from '@/core/constants';
import { Sparkles, Send } from 'lucide-react'; // Send ikonunu ekledik
import Link from 'next/link';
import { HomeHeader } from './components/home-header';

export function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 overflow-x-hidden">
            <HomeHeader />

            {children}

            <footer className="py-12 border-t border-white/5 bg-[#020202] text-zinc-500 text-sm">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-white opacity-80">
                                <Sparkles
                                    size={20}
                                    className="text-indigo-400"
                                />
                                <span className="font-bold text-lg tracking-tight">
                                    iban.bio
                                </span>
                            </div>

                            <p className="text-zinc-500">
                                <Link
                                    href="https://kadirhan.dev"
                                    target="_blank"
                                    rel="noopener"
                                    className="group relative inline-flex items-center transition-all duration-300 hover:text-zinc-200">
                                    Made by{' '}
                                    <span className="relative ml-1 font-medium text-zinc-300 transition-all duration-300 group-hover:text-indigo-300 group-hover:drop-shadow-[0_0_10px_rgba(129,140,248,0.45)]">
                                        kadirhan
                                        <span className="w-0 group-hover:w-full pointer-events-none absolute bottom-0 left-0 h-px border-b border-indigo-400 transition-all duration-300 group-hover:scale-x-100" />
                                    </span>
                                </Link>
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
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
                                href="https://t.me/ibanbio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-indigo-400 hover:text-white transition-colors font-medium">
                                <Send size={16} />
                                Join Telegram
                            </Link>

                            <Link
                                href="mailto:info@iban.bio"
                                className="hover:text-white transition-colors">
                                Contact Us
                            </Link>
                        </div>

                        <p className="text-zinc-600">
                            © {new Date().getFullYear()} iban.bio
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
