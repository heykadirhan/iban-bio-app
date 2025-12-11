'use client';
import { useEffect, useState } from 'react';
import {
    Plus,
    Eye,
    Copy,
    Wallet,
    ArrowUpRight,
    PlusCircle,
    Share,
    Settings,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { HttpService } from '@/core/services';
import { Endpoints, Routes } from '@/core/constants';
import { Button } from '@/components/ui/button';
import ModalPayment from '@/components/modal-payment';
import Link from 'next/link';
import { createRoute } from '@/core/utils';
import { ModalShare } from '@/components/modal-share';
import { PaymentMethodType } from '@/core/enums';
import PaymentCard from '@/components/payment-card';
import { Skeleton } from '@/components/ui/skeleton';

export function DashboardPage() {
    const session = useSession();
    const [paymentModal, setPaymentModal] = useState<{
        isOpen: boolean;
        initialData?: any;
    }>({ isOpen: false });
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('active');
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [dashboard, setDashboard] = useState({
        stats: { totalViews: 0, totalCopies: 0 },
        paymentMethods: [] as any[],
    });

    const fetchDashboard = async () => {
        try {
            setIsLoading(true);
            const res = await HttpService.request(Endpoints.DASHBOARD);
            setDashboard(res.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    return (
        <>
            <div className="container">
                <div className="py-6 pt-8">
                    <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-xl">
                        <div>
                            <p className="text-xs text-zinc-400 mb-1">
                                Your Link
                            </p>
                            {!isLoading ? (
                                <p className="text-sm text-primary font-medium font-mono">
                                    iban.bio/{session.data?.user.username}
                                </p>
                            ) : (
                                <Skeleton className="w-32 h-5 rounded-md bg-background" />
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Link href={Routes.SETTINGS}>
                                <button
                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                    title="Settings">
                                    <Settings size={16} />
                                </button>
                            </Link>
                            <button
                                onClick={() => setIsShareModalOpen(true)}
                                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                title="Share">
                                <Share size={16} />
                            </button>
                            <Link
                                href={createRoute({
                                    path: Routes.USER,
                                    pathParams: {
                                        username:
                                            session.data?.user.username || '',
                                    },
                                })}>
                                <button
                                    className="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors text-white"
                                    title="Preview">
                                    <ArrowUpRight size={16} />
                                </button>
                            </Link>
                        </div>
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

                <div className="flex flex-col bg-[#0f0f0f] min-h-[500px] rounded-xl border border-zinc-800 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
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

                    <div className="space-y-4">
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
                    </div>

                    {!dashboard.paymentMethods.length && !isLoading && (
                        <div className="flex flex-col items-center justify-center h-full flex-1 text-center pt-10 pb-16">
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
            />
        </>
    );
}
