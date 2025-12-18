'use client';

import { FileText, Lock, Printer } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function LegalPage() {
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState(
        searchParams.get('type') || 'terms',
    );

    return (
        <>
            <div className="container">
                <div className="pt-24 flex flex-col md:flex-row justify-between items-center mb-10 gap-6 no-print">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">
                            Legal Center
                        </h1>
                        <p className="text-zinc-400">
                            Transparency is our core value.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-zinc-900 p-1 rounded-xl flex border border-white/5">
                            <button
                                onClick={() => setActiveTab('terms')}
                                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                                    activeTab === 'terms'
                                        ? 'bg-zinc-800 text-white shadow-sm'
                                        : 'text-zinc-500 hover:text-zinc-300'
                                }`}>
                                Terms of Service
                            </button>
                            <button
                                onClick={() => setActiveTab('privacy')}
                                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                                    activeTab === 'privacy'
                                        ? 'bg-zinc-800 text-white shadow-sm'
                                        : 'text-zinc-500 hover:text-zinc-300'
                                }`}>
                                Privacy Policy
                            </button>
                        </div>

                        <button
                            onClick={() => window.print()}
                            className="hidden md:flex bg-white text-black w-10 h-10 items-center justify-center rounded-xl hover:bg-zinc-200 transition-colors"
                            title="Download as PDF">
                            <Printer size={20} />
                        </button>
                    </div>
                </div>

                <div className="glass-card print-content rounded-3xl p-10 md:p-16 border border-white/10 shadow-2xl">
                    <div className="hidden print-header">
                        <h1 className="text-3xl font-bold mb-1">iban.bio</h1>
                        <p className="text-sm text-gray-500">
                            Legal Documentation • Generated on 12/18/2025
                        </p>
                    </div>

                    {activeTab === 'terms' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-3 text-indigo-400 mb-6 no-print">
                                <FileText size={24} />
                                <span className="text-sm font-bold uppercase tracking-widest">
                                    Terms of Service
                                </span>
                            </div>

                            <div className="prose prose-invert max-w-none text-zinc-300 print:text-black">
                                <h2 className="text-2xl font-bold text-white mb-4 print:text-black">
                                    1. Acceptance of Terms
                                </h2>
                                <p>
                                    By creating an account, accessing, or using
                                    iban.bio ("the Service"), you agree to be
                                    bound by these Terms of Service. If you do
                                    not agree to these terms, please do not use
                                    the Service.
                                </p>

                                <h2 className="text-2xl font-bold text-white mt-8 mb-4 print:text-black">
                                    2. Description of Service
                                </h2>
                                <p>
                                    iban.bio is a digital profile management
                                    tool that allows users to store, organize,
                                    and share their financial receiving
                                    addresses (e.g., IBANs, Crypto Wallet
                                    Addresses, Payment Links) via a single URL
                                    or phone number search.
                                </p>
                                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl my-6 print:border-black print:bg-gray-100">
                                    <p className="text-red-400 font-bold text-sm mb-1 print:text-red-600">
                                        DISCLAIMER:
                                    </p>
                                    <p className="text-sm">
                                        iban.bio is <strong>NOT</strong> a bank,
                                        money transmitter, payment processor, or
                                        financial institution. We do{' '}
                                        <strong>NOT</strong> process, hold,
                                        transfer, or touch any funds. We
                                        strictly provide a hosting service for
                                        text-based data provided by users.
                                    </p>
                                </div>

                                <h2 className="text-2xl font-bold text-white mt-8 mb-4 print:text-black">
                                    3. User Responsibilities
                                </h2>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>
                                        <strong>Accuracy of Data:</strong> You
                                        are solely responsible for the accuracy
                                        of the IBANs, wallet addresses, and
                                        other information you display on your
                                        profile.
                                    </li>
                                    <li>
                                        <strong>Transactions:</strong> Any
                                        transaction initiated based on
                                        information found on iban.bio is
                                        strictly between the Sender and the
                                        Receiver.
                                    </li>
                                </ul>

                                <h2 className="text-2xl font-bold text-white mt-8 mb-4 print:text-black">
                                    4. Prohibited Activities
                                </h2>
                                <p>You agree not to use the Service for:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>
                                        Money laundering (AML) or financing
                                        terrorism.
                                    </li>
                                    <li>
                                        Collecting payments for illegal goods or
                                        services (e.g., drugs, weapons,
                                        unauthorized gambling).
                                    </li>
                                    <li>
                                        Impersonating others or creating fake
                                        profiles (Phishing).
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {activeTab === 'privacy' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-3 text-emerald-400 mb-6 no-print">
                                <Lock size={24} />
                                <span className="text-sm font-bold uppercase tracking-widest">
                                    Privacy Policy
                                </span>
                            </div>

                            <div className="prose prose-invert max-w-none text-zinc-300 print:text-black">
                                <h2 className="text-2xl font-bold text-white mb-4 print:text-black">
                                    1. Information We Collect
                                </h2>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>
                                        <strong>Identity Data:</strong> Phone
                                        number, username, display name, and
                                        profile picture.
                                    </li>
                                    <li>
                                        <strong>Financial Data:</strong> IBANs,
                                        crypto wallet addresses, and payment app
                                        usernames stored in your profile.
                                    </li>
                                    <li>
                                        <strong>Usage Data:</strong> IP address,
                                        device type, browser version, and
                                        interaction logs.
                                    </li>
                                </ul>

                                <h2 className="text-2xl font-bold text-white mt-8 mb-4 print:text-black">
                                    2. How We Use Your Information
                                </h2>
                                <p>
                                    We use your information to provide and
                                    maintain the Service, verify your identity
                                    via SMS (OTP), enable the "Find by Phone"
                                    search functionality, and detect fraud.
                                </p>

                                <h2 className="text-2xl font-bold text-white mt-8 mb-4 print:text-black">
                                    3. Data Security (Encryption)
                                </h2>
                                <p>
                                    We implement industry-standard security
                                    measures. Your sensitive financial data
                                    (IBANs, Wallet Addresses) is stored using{' '}
                                    <strong>AES-256 encryption</strong> at rest.
                                    While we strive to protect your data, no
                                    method of transmission over the Internet is
                                    100% secure.
                                </p>

                                <h2 className="text-2xl font-bold text-white mt-8 mb-4 print:text-black">
                                    4. Data Sharing
                                </h2>
                                <p>
                                    We do not sell your personal data. We
                                    maintain data processing agreements with
                                    infrastructure providers (Hosting, SMS
                                    Providers) solely to deliver the service.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
