'use client';
import { useEffect, useState } from 'react';
import {
    Plus,
    Eye,
    Copy,
    Wallet,
    ArrowUpRight,
    PlusCircle,
    Settings,
    Globe,
    LinkIcon,
    Lock,
    Timer,
    Share2,
    Check,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { HttpService } from '@/core/services';
import {
    Endpoints,
    PROFILE_VISIBILITY_OPTIONS,
    Routes,
} from '@/core/constants';
import { Button } from '@/components/ui/button';
import ModalPayment from '@/components/modal-payment';
import Link from 'next/link';
import { createRoute } from '@/core/utils';
import { ModalShare } from '@/components/modal-share';
import { PaymentMethodType, ProfileVisibility } from '@/core/enums';
import PaymentCard from '@/components/payment-card';
import { Skeleton } from '@/components/ui/skeleton';

export function DashboardPage() {
    const session = useSession();
    const [paymentModal, setPaymentModal] = useState<{
        isOpen: boolean;
        initialData?: Record<string, unknown>;
    }>({ isOpen: false });
    const [isLoading, setIsLoading] = useState(true);
    const [isGeneratingShareToken, setIsGeneratingShareToken] = useState(false);
    const [activeTab, setActiveTab] = useState('active');
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [shareToken, setShareToken] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [dashboard, setDashboard] = useState({
        stats: { totalViews: 0, totalCopies: 0 },
        paymentMethods: [] as any[],
    });

    const visibility: ProfileVisibility | undefined =
        session.data?.user?.visibility;

    const statusConfig = visibility
        ? {
              [ProfileVisibility.PUBLIC]: {
                  icon: Globe,
                  color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
                  glow: 'from-emerald-500/20',
              },
              [ProfileVisibility.EXPIRABLE]: {
                  icon: LinkIcon,
                  color: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
                  glow: 'from-amber-500/20',
              },
              [ProfileVisibility.PRIVATE]: {
                  icon: Lock,
                  color: 'text-red-400 bg-red-400/10 border-red-400/20',
                  glow: 'from-red-500/20',
              },
          }[visibility]
        : null;

    const fetchDashboard = async () => {
        try {
            setIsLoading(true);
            const res = await HttpService.request(Endpoints.DASHBOARD);
            setDashboard(res?.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const generateShareToken = async () => {
        try {
            setIsGeneratingShareToken(true);

            const res = await HttpService.request(Endpoints.SHARE_TOKENS, {
                method: 'POST',
            });

            setShareToken(res?.data?.token);
            setIsShareModalOpen(true);
        } finally {
            setIsGeneratingShareToken(false);
        }
    };

    return (
        <>
            <div className="container">
                <div className="py-6 pt-8">
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-4 shadow-2xl backdrop-blur-xl">
                        <div
                            className={`absolute -left-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${statusConfig?.glow} to-transparent blur-3xl pointer-events-none transition-colors duration-500`}
                        />

                        <div className="relative z-10 mb-3 flex items-start justify-between">
                            <div>
                                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                    Profile Status
                                </p>
                                {visibility ? (
                                    <div
                                        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold transition-colors ${statusConfig?.color}`}>
                                        {statusConfig?.icon && (
                                            <statusConfig.icon size={12} />
                                        )}
                                        {
                                            PROFILE_VISIBILITY_OPTIONS.find(
                                                (option) =>
                                                    option.id === visibility,
                                            )?.label
                                        }
                                    </div>
                                ) : (
                                    <Skeleton className="h-[26px] w-32" />
                                )}
                            </div>

                            <Link href={Routes.SETTINGS}>
                                <button
                                    className="rounded-full p-2 text-zinc-500 transition-colors hover:bg-white/5 hover:text-white"
                                    title="Settings">
                                    <Settings size={18} />
                                </button>
                            </Link>
                        </div>

                        <div className="relative z-10 flex flex-wrap items-center gap-3">
                            <div
                                onClick={() => {
                                    if (!isLoading) {
                                        navigator.clipboard.writeText(
                                            `iban.bio/${session.data?.user.username}`,
                                        );
                                        setIsCopied(true);
                                        setTimeout(
                                            () => setIsCopied(false),
                                            2000,
                                        );
                                    }
                                }}
                                className="group flex h-12 flex-1 cursor-pointer items-center justify-between rounded-xl outline outline-white/5 bg-black/20 px-4 transition-all hover:border-white/10 hover:bg-black/40 active:scale-[0.99]">
                                {!isLoading ? (
                                    <span className="font-mono text-sm text-zinc-400 truncate">
                                        iban.bio/
                                        <span className="text-white font-semibold">
                                            {session.data?.user.username}
                                        </span>
                                    </span>
                                ) : (
                                    <Skeleton className="h-5 w-24 rounded bg-white/5" />
                                )}
                                {isCopied ? (
                                    <Check
                                        size={14}
                                        className="text-green-500 transition-colors group-hover:text-green-600"
                                    />
                                ) : (
                                    <Copy
                                        size={14}
                                        className="text-zinc-600 transition-colors group-hover:text-white"
                                    />
                                )}
                            </div>

                            {visibility === ProfileVisibility.PUBLIC ? (
                                <div className="inline-flex items-center justify-between sm:justify-start gap-3 w-full sm:w-fit">
                                    <Button
                                        onClick={() =>
                                            setIsShareModalOpen(true)
                                        }
                                        className="h-12 flex-1 sm:w-12 rounded-xl"
                                        variant="primary">
                                        <Share2 size={20} />
                                        <span className="sm:hidden">Share</span>
                                    </Button>
                                    <Link
                                        href={createRoute({
                                            path: Routes.USER,
                                            pathParams: {
                                                username:
                                                    session.data?.user
                                                        .username || '',
                                            },
                                        })}
                                        className="flex-1 sm:w-12">
                                        <Button
                                            className="h-12 w-full rounded-xl"
                                            variant="secondary">
                                            <ArrowUpRight size={20} />
                                            <span className="sm:hidden">
                                                View Profile
                                            </span>
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                visibility === ProfileVisibility.EXPIRABLE && (
                                    <Button
                                        onClick={generateShareToken}
                                        disabled={isGeneratingShareToken}
                                        className="w-full h-12 rounded-xl"
                                        variant="secondary">
                                        <Timer size={20} />
                                        Generate Link
                                    </Button>
                                )
                            )}
                        </div>

                        {visibility === ProfileVisibility.EXPIRABLE && (
                            <p className="mt-3 pl-1 text-[10px] font-medium text-amber-500/60 flex items-center gap-1 animate-pulse">
                                {
                                    '* Your profile is hidden in the list. Use the "Generate Link" button to share.'
                                }
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-[#121212] border border-zinc-800 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-2 text-zinc-400">
                            <Eye size={16} />
                            <span className="text-xs font-medium uppercase">
                                Page Views
                            </span>
                        </div>
                        {!isLoading ? (
                            <p className="text-2xl font-bold">
                                {dashboard.stats.totalViews.toLocaleString()}
                            </p>
                        ) : (
                            <Skeleton className="w-full h-8" />
                        )}
                        <p className="text-xs text-zinc-500 mt-1">
                            Total views
                        </p>
                    </div>
                    <div className="bg-[#121212] border border-zinc-800 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-2 text-zinc-400">
                            <Copy size={16} />
                            <span className="text-xs font-medium uppercase">
                                Copies
                            </span>
                        </div>
                        {!isLoading ? (
                            <p className="text-2xl font-bold">
                                {dashboard.stats.totalCopies.toLocaleString()}
                            </p>
                        ) : (
                            <Skeleton className="w-full h-8" />
                        )}
                        <p className="text-xs text-zinc-500 mt-1">
                            Total copies made
                        </p>
                    </div>
                </div>

                <div className="flex flex-col bg-[#0f0f0f] rounded-xl min-h-72 border border-zinc-800 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold">Payment methods</h2>
                        <div className="flex bg-zinc-900 rounded-lg p-1">
                            <button
                                onClick={() => setActiveTab('active')}
                                className={`px-3 py-1 text-xs rounded-md transition-all ${
                                    activeTab === 'active'
                                        ? 'bg-zinc-700 text-white shadow-sm'
                                        : 'text-zinc-500'
                                }`}>
                                Active
                            </button>
                            <button
                                onClick={() => setActiveTab('archived')}
                                className={`px-3 py-1 text-xs rounded-md transition-all ${
                                    activeTab === 'archived'
                                        ? 'bg-zinc-700 text-white shadow-sm'
                                        : 'text-zinc-500'
                                }`}>
                                Archived
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col space-y-4">
                        {dashboard.paymentMethods
                            .filter((m) =>
                                activeTab === 'active'
                                    ? m.isActive
                                    : !m.isActive,
                            )
                            .map((item) => (
                                <PaymentCard
                                    key={item._id}
                                    paymentData={item}
                                    isDashboard={true}
                                    onEdit={() =>
                                        setPaymentModal({
                                            isOpen: true,
                                            initialData: {
                                                ...item,
                                                meta: {
                                                    ...item.meta,
                                                    [`${
                                                        {
                                                            [PaymentMethodType.IBAN]:
                                                                'ibanNumber',
                                                            [PaymentMethodType.CRYPTO]:
                                                                'address',
                                                            [PaymentMethodType.APP]:
                                                                'number',
                                                            [PaymentMethodType.LINK]:
                                                                'linkUrl',
                                                        }[
                                                            item.type as PaymentMethodType
                                                        ]
                                                    }`]: item.decryptedValue,
                                                },
                                            },
                                        })
                                    }
                                    onRefetch={fetchDashboard}
                                />
                            ))}

                        {isLoading &&
                            [1, 2, 3].map((i) => (
                                <Skeleton
                                    key={i}
                                    className="w-full h-[170px] rounded-2xl"
                                />
                            ))}

                        {!!dashboard.paymentMethods.length && (
                            <div className="mt-auto pt-2">
                                <Button
                                    onClick={() =>
                                        setPaymentModal({ isOpen: true })
                                    }
                                    variant="dashed"
                                    size="lg"
                                    className="w-full">
                                    <PlusCircle />
                                    Add payment method
                                </Button>
                            </div>
                        )}
                    </div>

                    {!dashboard.paymentMethods.length && !isLoading && (
                        <div className="flex flex-col items-center justify-center h-full flex-1 text-center py-16 opacity-75">
                            <Wallet
                                size={48}
                                className="mx-auto mb-3 text-zinc-600"
                            />
                            <h3 className="font-bold text-lg">
                                No Payment Methods
                            </h3>
                            <p className="mt-2 text-zinc-400 max-w-xs mx-auto">
                                Add your first payment method and start sharing
                                your financial bio link.
                            </p>
                            <Button
                                onClick={() =>
                                    setPaymentModal({ isOpen: true })
                                }
                                className="mt-4"
                                variant="primary">
                                <PlusCircle />
                                Add Payment Method
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setPaymentModal({ isOpen: true })}
                    className="w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)] flex items-center justify-center transition-transform hover:scale-105 active:scale-95">
                    <Plus size={28} />
                </button>
            </div>

            <ModalPayment
                isOpen={paymentModal.isOpen}
                initialData={paymentModal.initialData}
                onClose={() => {
                    setPaymentModal({
                        isOpen: false,
                    });
                    fetchDashboard();
                }}
            />
            <ModalShare
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                username={session.data?.user.username || ''}
                shareToken={shareToken}
            />
        </>
    );
}
