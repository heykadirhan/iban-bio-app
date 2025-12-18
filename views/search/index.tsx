'use client';

import { useEffect, useState } from 'react';
import {
    Search,
    ArrowRight,
    ShieldCheck,
    Loader2,
    UserPlus,
    XCircle,
    Globe,
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Endpoints, Routes } from '@/core/constants';
import InputPhone from '@/components/input-phone';
import { HttpService } from '@/core/services';
import { createRoute, isoToCode } from '@/core/utils';
import { ProfileVisibility } from '@/core/enums/profile-visibility.enum';
import Image from 'next/image';

export function SearchPage() {
    const searchParams = useSearchParams();
    const [country, setCountry] = useState(searchParams.get('country') || '');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [foundUser, setFoundUser] = useState<
        | {
              avatarUrl?: string;
              displayName: string;
              username: string;
              title?: string;
              bio?: string;
              visibility: ProfileVisibility;
          }
        | null
        | undefined
    >(undefined);

    useEffect(() => {
        setPhone(searchParams.get('phone') || '');
    }, [searchParams]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await HttpService.request(
                createRoute({
                    path: Endpoints.FIND_PROFILE_BY_PHONE,
                    searchParams: { phone: isoToCode(country) + phone },
                }),
                {
                    method: 'GET',
                    noToastError: true,
                },
            );

            setFoundUser(res?.data || null);
        } catch {
            setFoundUser(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-32 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="container">
                <div className="w-full max-w-md mx-auto relative z-10">
                    {/* Başlık Alanı */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold mb-3 tracking-tight">
                            Who are you paying?
                        </h1>
                        <p className="text-zinc-400">
                            Find profiles by phone number and make payments.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSearch}
                        className="relative group">
                        <div className="mt-2.5">
                            <InputPhone
                                onPhoneChange={(val) => setPhone(val)}
                                onCountryChange={(val) => setCountry(val)}
                                value={phone}
                                defaultCountry={
                                    searchParams.get('country') || undefined
                                }
                                suffix={
                                    <Button
                                        disabled={loading}
                                        type="submit"
                                        size="icon"
                                        variant="primary">
                                        {loading ? (
                                            <Loader2
                                                size={16}
                                                className="animate-spin"
                                            />
                                        ) : (
                                            <Search size={16} />
                                        )}
                                    </Button>
                                }
                            />
                        </div>
                    </form>

                    <div className="mt-16">
                        {!!foundUser && (
                            <Link
                                href={`/${foundUser?.username}`}
                                className="bg-zinc-900/50 border border-white/10 hover:border-primary/30 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-zinc-900 transition-all animate-in slide-in-from-bottom-4 group">
                                <div className="relative">
                                    {foundUser.avatarUrl ? (
                                        <Image
                                            src={foundUser.avatarUrl}
                                            alt={foundUser.displayName}
                                            className="rounded-full object-cover border-2 border-zinc-800"
                                            width={64}
                                            height={64}
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border-2 border-zinc-800 text-zinc-500">
                                            {foundUser.displayName
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                                        {foundUser.displayName}
                                    </h3>
                                    <p className="text-zinc-500 text-sm">
                                        @{foundUser.username}
                                    </p>
                                </div>
                                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                    <ArrowRight size={20} />
                                </div>
                            </Link>
                        )}

                        {foundUser === null && (
                            <div className="text-center animate-in slide-in-from-bottom-4">
                                <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                                    <XCircle size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">
                                    User not found
                                </h3>
                                <p className="text-zinc-400 text-sm mb-6 max-w-xs mx-auto">
                                    This number is not using iban.bio yet. You
                                    can invite them to request payment
                                    information.
                                </p>

                                <Link
                                    href={`https://wa.me/90${phone}?text=${encodeURIComponent(
                                        'Hi! I am inviting you to join iban.bio to easily share your payment details and receive payments securely. Sign up here: https://iban.bio/' +
                                            Routes.GET_STARTED,
                                    )}`}
                                    target="_blank">
                                    <Button className="bg-[#25D366] hover:bg-[#20bd5a] text-black !px-12 font-semibold">
                                        <UserPlus size={20} />
                                        Invite via WhatsApp
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {foundUser === undefined && (
                            <div className="mt-16 flex items-center justify-center gap-8 opacity-20">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                                    <ShieldCheck size={16} /> Encrypted
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                                    <Globe size={16} /> Global
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
