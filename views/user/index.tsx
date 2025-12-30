'use client';

import { useState } from 'react';
import {
    Share,
    ArrowRight,
    ShieldCheck,
    Sparkles,
    PlusCircle,
    LinkIcon,
    LayoutGrid,
    Landmark,
    Bitcoin,
    Smartphone,
    EyeOff,
    Edit2,
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Routes } from '@/core/constants';
import { Button } from '@/components/ui/button';
import { ModalShare } from '@/components/modal-share';
import PaymentCard from '@/components/payment-card';
import { PaymentMethodType, ProfileVisibility } from '@/core/enums';

export function UserPage({
    user: { profile, paymentMethods },
}: {
    user: {
        profile: {
            avatarUrl?: string;
            displayName: string;
            username: string;
            title?: string;
            bio?: string;
            visibility: ProfileVisibility;
        };
        paymentMethods: Array<{
            _id: string;
            type: PaymentMethodType;
            title: string;
            details: Record<string, any>;
            createdAt: string;
            updatedAt: string;
        }>;
    };
}) {
    const session = useSession();
    const tabs = [
        'ALL',
        ...Object.values(PaymentMethodType).filter((type) =>
            paymentMethods.some((method) => method.type === type),
        ),
    ];
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<PaymentMethodType | 'ALL'>(
        'ALL',
    );

    return (
        <>
            <div className="container">
                <div className="mt-8 px-6 pb-8 text-center z-10">
                    <div className="relative inline-block">
                        <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-purple-500 via-blue-500 to-transparent">
                            {profile.avatarUrl ? (
                                <Image
                                    src={profile.avatarUrl}
                                    alt={`${profile.displayName}'s avatar`}
                                    width={256}
                                    height={256}
                                    className="w-full h-full rounded-full object-cover border-4 border-background"
                                />
                            ) : (
                                <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center border-4 border-background text-3xl font-bold">
                                    {profile.displayName
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>
                            )}
                        </div>
                        {/* TODO: Add icon based on user's persona */}
                        {/* <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full border-4 border-[#050505]">
                            <Shield
                                size={12}
                                fill="currentColor"
                            />
                        </div> */}
                    </div>

                    <div className="mt-3 flex justify-center items-center gap-3">
                        <h1 className="text-2xl font-bold">
                            {profile.displayName}
                        </h1>
                        <button
                            onClick={() => setIsShareModalOpen(true)}
                            className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 hover:bg-zinc-800 transition">
                            <Share
                                size={16}
                                className="text-zinc-400"
                            />
                        </button>
                    </div>
                    <p className="text-zinc-500 text-sm mt-1">
                        @{profile.username}{' '}
                        {profile.title ? '• ' + profile.title : ''}
                    </p>
                    <p
                        className={cn(
                            'mt-2 text-sm',
                            profile.bio
                                ? 'text-zinc-400'
                                : 'italic text-zinc-600',
                        )}>
                        {profile.bio || 'This user has not added a bio yet.'}
                    </p>
                </div>

                {session.data?.user.username === profile.username &&
                    profile.visibility === ProfileVisibility.PRIVATE && (
                        <div className="mx-6 mb-2 animate-in slide-in-from-top-4 duration-500">
                            <div className="bg-amber-500/10 border border-amber-500/20 backdrop-blur-md p-4 rounded-2xl flex items-start gap-3 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="p-2 bg-amber-500/20 rounded-xl text-amber-500 shrink-0 relative z-10">
                                    <EyeOff size={18} />
                                </div>

                                <div className="relative z-10">
                                    <h4 className="text-sm font-bold text-amber-500 mb-0.5">
                                        Profile is Private
                                    </h4>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        {
                                            'Your profile is currently set to "Private". Visitors cannot view this page.'
                                        }
                                    </p>
                                    <Link
                                        href={Routes.SETTINGS}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 mt-2 hover:text-amber-400 transition-colors">
                                        Change in Settings{' '}
                                        <ArrowRight size={12} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                <div className="flex-1 bg-zinc-900/50 backdrop-blur-2xl rounded-[40px] border-t border-white/5 p-6 space-y-4">
                    <div className="flex justify-between items-end mb-3">
                        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">
                            Payment Methods
                        </h3>
                    </div>

                    {tabs.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 hide-scrollbar scroll-smooth mask-linear-fade">
                            {tabs.map((tab) => {
                                const count =
                                    tab === 'ALL'
                                        ? paymentMethods.length
                                        : paymentMethods.filter(
                                              (m) => m.type === tab,
                                          ).length;

                                return (
                                    <button
                                        key={tab}
                                        onClick={() =>
                                            setActiveTab(
                                                tab as
                                                    | PaymentMethodType
                                                    | 'ALL',
                                            )
                                        }
                                        className={`
                      flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap border
                      ${
                          activeTab === tab
                              ? 'bg-white text-black border-white shadow-lg shadow-white/10 scale-[1.02]'
                              : 'bg-zinc-800/50 text-zinc-400 border-white/5 hover:bg-zinc-800 hover:text-white'
                      }
                    `}>
                                        {
                                            {
                                                ALL: <LayoutGrid />,
                                                [PaymentMethodType.IBAN]: (
                                                    <Landmark />
                                                ),
                                                [PaymentMethodType.CRYPTO]: (
                                                    <Bitcoin />
                                                ),
                                                [PaymentMethodType.APP]: (
                                                    <Smartphone />
                                                ),
                                                [PaymentMethodType.LINK]: (
                                                    <LinkIcon />
                                                ),
                                            }[tab]
                                        }
                                        {
                                            {
                                                ALL: 'All',
                                                [PaymentMethodType.IBAN]:
                                                    'IBAN',
                                                [PaymentMethodType.CRYPTO]:
                                                    'Crypto',
                                                [PaymentMethodType.APP]: 'App',
                                                [PaymentMethodType.LINK]:
                                                    'Link',
                                            }[tab]
                                        }
                                        <span
                                            className={`ml-1 text-xs px-1.5 py-0.5 rounded-md ${
                                                activeTab === tab
                                                    ? 'bg-black/10 text-black'
                                                    : 'bg-zinc-800 text-zinc-500'
                                            }`}>
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    <div className="space-y-4">
                        {paymentMethods.length > 0 ? (
                            paymentMethods
                                .filter(
                                    (item) =>
                                        activeTab === 'ALL' ||
                                        item.type === activeTab,
                                )
                                .map((item) => (
                                    <div
                                        key={item._id}
                                        className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <PaymentCard paymentData={item} />
                                    </div>
                                ))
                        ) : (
                            <div className="text-center py-12 flex flex-col items-center animate-in zoom-in duration-300">
                                <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mb-3">
                                    <LinkIcon
                                        size={32}
                                        className="text-zinc-600"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold">
                                    Nothing to Show 🙁
                                </h3>
                                <p className="text-zinc-400 max-w-60 mt-1.5 text-sm">
                                    Looks like there are no payment methods to
                                    show.
                                </p>
                                {session.data?.user?.username ===
                                    profile.username && (
                                    <Link href={Routes.DASHBOARD}>
                                        <Button
                                            variant="dashed"
                                            className="mt-4">
                                            <Edit2 size={16} /> Edit Your
                                            Profile
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {session.status === 'unauthenticated' && (
                    <div className="mt-8 mb-12 relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-50 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200"></div>

                        <div className="relative flex flex-col justify-between p-6 bg-[#0a0a0a] rounded-2xl border border-white/10 shadow-2xl">
                            <div className="flex items-start gap-4 mb-4 sm:mb-0">
                                <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/5">
                                    <Sparkles
                                        className="text-primary"
                                        size={24}
                                    />
                                </div>

                                <div className="text-left">
                                    <h3 className="text-lg font-bold text-white leading-tight">
                                        Create Your iban.bio Link Today!
                                    </h3>
                                    <p className="text-sm text-zinc-400 mt-1 leading-relaxed max-w-[250px]">
                                        Share your IBAN and Crypto addresses
                                        securely in one link. Free.
                                    </p>

                                    <div className="flex items-center gap-1.5 mt-3">
                                        <ShieldCheck
                                            size={12}
                                            className="text-green-500"
                                        />
                                        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                                            256-Bit Crypted
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Sağ Taraf: Buton */}
                            <Link
                                href={Routes.GET_STARTED}
                                className="w-full mt-2">
                                <Button
                                    className="w-full"
                                    size="lg"
                                    variant="primary">
                                    Create Your Free Link
                                    <ArrowRight
                                        size={16}
                                        className="group-hover/btn:translate-x-1 transition-transform"
                                    />
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            <ModalShare
                isOpen={isShareModalOpen}
                username={profile.username}
                onClose={() => setIsShareModalOpen(false)}
            />
        </>
    );
}
