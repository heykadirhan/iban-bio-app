'use client';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const FaqItem = ({
    question,
    answer,
    isOpen,
    onClick,
}: {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick(): void;
}) => {
    return (
        <div className="border-b border-white/10">
            <button
                onClick={onClick}
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none">
                <span className="text-lg font-medium text-zinc-200">
                    {question}
                </span>
                <ChevronDown
                    className={`text-zinc-500 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-40 pb-6' : 'max-h-0'
                }`}>
                <p className="text-zinc-400 leading-relaxed">{answer}</p>
            </div>
        </div>
    );
};

export const SectionFaq = () => {
    const [selectedFaqItem, setSelectedFaqItem] = useState<number>(-1);

    return (
        <section
            id="faq"
            className="py-24 px-6 max-w-3xl mx-auto">
            <div className="container">
                <h2 className="text-3xl font-bold mb-10 text-center">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-2">
                    {[
                        {
                            question: 'Is iban.bio free?',
                            answer: 'Yes, the core features are free forever. We will introduce Premium features for power users later.',
                        },
                        {
                            question: 'Is it safe to share my IBAN?',
                            answer: 'iban.bio adds a layer of privacy. Instead of posting your raw IBAN on social media (where bots can scrape it), you share a iban.bio link. We mask the numbers visually until a user clicks to copy.',
                        },
                        {
                            question: 'Can I receive payments directly?',
                            answer: 'No, iban.bio is a directory for your payment details. We do not process money. Users copy your details and pay you through their own banking apps. This means 0% fees for you.',
                        },
                        {
                            question: 'Do you support Crypto?',
                            answer: 'Absolutely. We are crypto-native. You can add addresses for Bitcoin, Ethereum, USDT, and specify the network (TRC20, ERC20, etc.) to ensure safe transfers.',
                        },
                    ].map((item, idx) => (
                        <FaqItem
                            key={idx}
                            question={item.question}
                            answer={item.answer}
                            isOpen={selectedFaqItem === idx}
                            onClick={() => setSelectedFaqItem(idx)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
