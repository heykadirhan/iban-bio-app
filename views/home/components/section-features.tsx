import { Globe, Lock, ShieldCheck, Smartphone, Zap } from 'lucide-react';

export function SectionFeatures() {
    return (
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
                                Your IBANs and wallet addresses are masked by
                                default (`TR12 **** 56`). They only reveal when
                                a real human clicks to copy, protecting you from
                                web scrapers and bots.
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
                        <h3 className="text-xl font-bold mb-3">Crypto Ready</h3>
                        <p className="text-zinc-400 text-sm">
                            Support for all major chains. Visual indicators for
                            ERC20, TRC20, BEP20 to prevent lost funds.
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
                                Whether you use Wise, Revolut, or a local bank,
                                iban.bio unifies them all. Share one link with
                                clients anywhere in the world.
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
    );
}
