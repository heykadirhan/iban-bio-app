import { CheckCircle2, User, Wallet } from 'lucide-react';

export function SectionHowItWorks() {
    return (
        <section
            id="how-it-works"
            className="py-24">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                        Get Paid in 3 Steps
                    </h2>
                    <p className="text-zinc-400">
                        Setup takes less than 60 seconds.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: 'Claim Username',
                            desc: 'Sign up with your phone number and secure your unique URL.',
                            icon: User,
                        },
                        {
                            title: 'Add Assets',
                            desc: 'Input your IBANs, crypto addresses, or payment links.',
                            icon: Wallet,
                        },
                        {
                            title: 'Get Paid',
                            desc: 'Share your link. People can copy details with one click.',
                            icon: CheckCircle2,
                        },
                    ].map((step, i) => (
                        <div
                            key={i}
                            className="glass-card p-8 rounded-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl text-white group-hover:scale-110 transition-transform duration-500">
                                {i + 1}
                            </div>
                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-colors">
                                <step.icon className="text-white group-hover:text-indigo-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">
                                {step.title}
                            </h3>
                            <p className="text-zinc-400 leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
