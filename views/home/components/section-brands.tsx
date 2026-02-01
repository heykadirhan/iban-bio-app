export function SectionBrands() {
    return (
        <div className="py-12 border-y border-white/5 bg-white/[0.02] overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#050505] to-transparent z-10"></div>

            <div className="flex gap-16 items-center animate-scroll whitespace-nowrap min-w-full">
                {[
                    'Chase',
                    'Binance',
                    'Wise',
                    'PayPal',
                    'Revolut',
                    'Stripe',
                    'Coinbase',
                    'Wells Fargo',
                    'Metamask',
                    'Venmo',
                ].map((brand, i) => (
                    <span
                        key={i}
                        className="text-2xl font-bold text-zinc-600 uppercase tracking-widest hover:text-white transition-colors cursor-default">
                        {brand}
                    </span>
                ))}
                {[
                    'Chase',
                    'Binance',
                    'Wise',
                    'PayPal',
                    'Revolut',
                    'Stripe',
                    'Coinbase',
                    'Wells Fargo',
                    'Metamask',
                    'Venmo',
                ].map((brand, i) => (
                    <span
                        key={`dup-${i}`}
                        className="text-2xl font-bold text-zinc-600 uppercase tracking-widest hover:text-white transition-colors cursor-default">
                        {brand}
                    </span>
                ))}
            </div>
        </div>
    );
}
