'use client';

import { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Download, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Routes } from '@/core/constants';

interface QRCodeConfigType {
    size: number;
    level: 'L' | 'M' | 'Q' | 'H';
    includeMargin: boolean;
}

export function IbanQrGenerator() {
    const [iban, setIban] = useState('');
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState('');
    const qrRef = useRef<HTMLDivElement>(null);

    const validateIBAN = (value: string): boolean => {
        const cleanedIBAN = value.toUpperCase().replace(/\s/g, '');
        const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/;
        return ibanRegex.test(cleanedIBAN);
    };

    const handleIbanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase();
        setIban(value);

        if (value && !validateIBAN(value)) {
            setError('Invalid IBAN format');
        } else {
            setError('');
        }
    };

    const generatePaymentString = (ibanValue: string): string => {
        const cleanedIBAN = ibanValue.toUpperCase().replace(/\s/g, '');
        // EPC QR Code Standard (European Payments Council)
        // Format: BCD / Version / Encoding / Identification / BIC / Beneficiary Name / Account / Amount / Purpose / Structured Reference / Unstructured Remittance / Beneficiary to Payer
        const epcQrCode = [
            'BCD',           // Service tag
            '002',           // Version
            '1',             // Encoding (UTF-8)
            'SCT',           // Identification (SEPA Credit Transfer)
            '',              // BIC (optional, leaving empty)
            '',              // Beneficiary Name (optional)
            cleanedIBAN,     // IBAN
            '',              // Amount (optional, leaving empty for user to enter in app)
            '',              // Purpose (optional)
            '',              // Structured Reference (optional)
            '',              // Unstructured Remittance (optional)
            '',              // Beneficiary to Payer Information (optional)
        ].join('\n');
        return epcQrCode;
    };

    const downloadQR = async () => {
        if (!validateIBAN(iban)) {
            setError('Invalid IBAN format');
            return;
        }

        setIsDownloading(true);
        try {
            const canvas = qrRef.current?.querySelector(
                'canvas',
            ) as HTMLCanvasElement;
            if (!canvas) {
                throw new Error('QR code not found');
            }

            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = `IBAN-QR-${iban.substring(0, 10)}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            setError('Download failed');
            console.error(err);
        } finally {
            setIsDownloading(false);
        }
    };

    const qrConfig: QRCodeConfigType = {
        size: 300,
        level: 'H',
        includeMargin: true,
    };

    const isValidIBAN = iban && validateIBAN(iban);

    return (
        <div className="w-full space-y-10">
            {/* Input Section */}
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md p-8 rounded-2xl border-2 border-white/15">
                <div className="space-y-2">
                    <Label
                        htmlFor="iban"
                        className="text-sm font-bold text-white uppercase tracking-widest block">
                        Enter Your IBAN
                    </Label>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        Format: 2 letters + 2 numbers + up to 30 characters
                    </p>
                </div>

                <div className="relative group">
                    <Input
                        id="iban"
                        placeholder="DE89 3704 0044 0532 0130 00"
                        value={iban}
                        onChange={handleIbanChange}
                        className={`w-full px-5 py-4 text-lg font-mono bg-zinc-900/50 border-2 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                            error
                                ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/40 text-white placeholder-red-900/40'
                                : iban
                                  ? 'border-blue-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40 text-white placeholder-blue-900/40'
                                  : 'border-blue-500/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 text-white placeholder-zinc-600 hover:border-blue-500/60'
                        }`}
                    />
                </div>

                {error && (
                    <div className="flex items-center gap-3 text-red-300 text-sm animate-in fade-in slide-in-from-top-1 duration-200 bg-red-500/15 border-2 border-red-500/40 rounded-lg p-3 px-4">
                        <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                        <span className="font-medium">{error}</span>
                    </div>
                )}
            </div>

            {/* QR Code Display */}
            {isValidIBAN && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-8 rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-4 overflow-hidden group hover:border-white/20 transition-all duration-300">
                        <div
                            ref={qrRef}
                            className="bg-white p-3 rounded-lg shadow-2xl ring-1 ring-black/10">
                            <QRCodeSVG
                                value={generatePaymentString(iban)}
                                {...qrConfig}
                            />
                        </div>
                        <div className="text-center space-y-2">
                            <p className="text-xs text-zinc-500">
                                Scan to initiate payment • Right-click to save
                            </p>
                            <p className="text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-1.5">
                                ✓ Works with all major EU banking apps
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Download Button */}
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md p-8 rounded-2xl border-2 border-blue-500/40 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Button
                    onClick={downloadQR}
                    disabled={!isValidIBAN || isDownloading}
                    className={`w-full py-4 px-6 text-base font-bold rounded-xl transition-all duration-300 border-2 shadow-2xl ${
                        isValidIBAN && !isDownloading
                            ? 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white border-blue-500 hover:border-blue-400 hover:shadow-blue-500/40 hover:-translate-y-1 active:translate-y-0'
                            : 'bg-zinc-800 text-zinc-500 border-zinc-700 cursor-not-allowed'
                    }`}>
                    {isDownloading ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Generating QR Code...
                        </>
                    ) : (
                        <>
                            <Download className="w-5 h-5 mr-2" />
                            Download QR Code (PNG)
                        </>
                    )}
                </Button>
            </div>

            {/* Profile CTA */}
            <div className="mt-6 relative group animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="relative flex flex-col p-4 bg-gradient-to-br from-zinc-900/40 to-zinc-900/20 backdrop-blur-md rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300 space-y-3">
                    <div className="flex items-start gap-3">
                        <div className="h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors">
                            <Sparkles
                                className="text-blue-400 group-hover:text-blue-300 transition-colors"
                                size={18}
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                                Sync Multiple IBANs
                            </h3>
                            <p className="text-xs text-zinc-400 mt-0.5">
                                Create a profile for advanced management
                            </p>
                        </div>
                    </div>

                    <Link
                        href={Routes.GET_STARTED}
                        className="w-full">
                        <Button className="w-full h-8 text-xs font-semibold bg-white text-black hover:bg-blue-50 active:bg-zinc-200 transition-all duration-200 rounded-lg shadow-sm hover:shadow-md">
                            Create Profile
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
