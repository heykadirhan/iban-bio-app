import { IbanQrGenerator } from '@/components/iban-qr-generator';

export default function IbanQrGeneratorView() {
    return (
        <div className="max-w-2xl mx-auto pt-32 pb-16">
            <div className="mb-12 px-6 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        <span className="text-xs font-semibold text-blue-300 uppercase tracking-widest">
                            Tool
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        IBAN QR Code Generator
                    </h1>
                    <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
                        Transform your IBAN into a scannable QR code. Perfect
                        for Point of Sale systems, invoice headers, business
                        cards, and rapid payment processing.
                    </p>
                </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-900/60 to-zinc-900/30 backdrop-blur-xl rounded-3xl border-2 border-white/10 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-2xl shadow-blue-500/10">
                <IbanQrGenerator />
            </div>

            <div className="mt-16 grid md:grid-cols-2 gap-6 px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="group bg-gradient-to-br from-zinc-900/40 to-zinc-900/20 backdrop-blur-xl p-6 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-zinc-900/50 transition-all duration-300">
                    <div className="flex items-center gap-2.5 mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <h3 className="text-sm font-semibold text-white">
                            Benefits
                        </h3>
                    </div>
                    <ul className="space-y-2.5 text-sm text-zinc-400">
                        <li className="flex items-start gap-2.5">
                            <span className="text-blue-400 font-bold mt-0.5 shrink-0">
                                •
                            </span>
                            <span className="group-hover:text-white transition-colors">
                                Instant payment initiation
                            </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                            <span className="text-blue-400 font-bold mt-0.5 shrink-0">
                                •
                            </span>
                            <span className="group-hover:text-white transition-colors">
                                Professional appearance
                            </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                            <span className="text-blue-400 font-bold mt-0.5 shrink-0">
                                •
                            </span>
                            <span className="group-hover:text-white transition-colors">
                                Works offline after generation
                            </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                            <span className="text-blue-400 font-bold mt-0.5 shrink-0">
                                •
                            </span>
                            <span className="group-hover:text-white transition-colors">
                                Share across all channels
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="group bg-gradient-to-br from-zinc-900/40 to-zinc-900/20 backdrop-blur-xl p-6 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-zinc-900/50 transition-all duration-300">
                    <div className="flex items-center gap-2.5 mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        <h3 className="text-sm font-semibold text-white">
                            Best Practices
                        </h3>
                    </div>
                    <ul className="space-y-2.5 text-sm text-zinc-400">
                        <li className="flex items-start gap-2.5">
                            <span className="text-purple-400 font-bold mt-0.5 shrink-0">
                                •
                            </span>
                            <span className="group-hover:text-white transition-colors">
                                Verify IBAN accuracy before use
                            </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                            <span className="text-purple-400 font-bold mt-0.5 shrink-0">
                                •
                            </span>
                            <span className="group-hover:text-white transition-colors">
                                Print at 2x2 inches minimum
                            </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                            <span className="text-purple-400 font-bold mt-0.5 shrink-0">
                                •
                            </span>
                            <span className="group-hover:text-white transition-colors">
                                EUR currency configured
                            </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                            <span className="text-purple-400 font-bold mt-0.5 shrink-0">
                                •
                            </span>
                            <span className="group-hover:text-white transition-colors">
                                EPC QR Code Standard
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl p-6 rounded-2xl border border-blue-500/20">
                    <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                        <span className="text-blue-400">🏦</span>
                        Bank App Compatibility
                    </h3>
                    <p className="text-sm text-zinc-300 mb-4 leading-relaxed">
                        Our QR codes follow the EPC (European Payments Council) standard and work seamlessly with banking apps across the EU including:
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                            <span className="text-blue-400 font-bold">✓</span>
                            Digital banking apps
                        </div>
                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                            <span className="text-blue-400 font-bold">✓</span>
                            Payment service providers
                        </div>
                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                            <span className="text-blue-400 font-bold">✓</span>
                            Mobile payment solutions
                        </div>
                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                            <span className="text-blue-400 font-bold">✓</span>
                            SEPA payment systems
                        </div>
                    </div>
                    <p className="text-xs text-zinc-500 mt-4 bg-blue-500/5 border border-blue-500/10 rounded-lg p-3">
                        Customers can scan the QR code directly from your invoice, website, or any printout, and their banking app will automatically open with your IBAN pre-filled.
                    </p>
                </div>
            </div>
        </div>
    );
}
