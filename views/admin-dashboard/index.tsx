'use client';
import React, { useEffect, useState } from 'react';
import {
    Users,
    CreditCard,
    Activity,
    TrendingUp,
    Search,
    MoreVertical,
    CheckCircle,
    Calendar,
    Wallet,
    Smartphone,
    Globe,
    Lock,
} from 'lucide-react';
import { HttpService } from '@/core/services';
import { Endpoints } from '@/core/constants';
import { AdminLayout } from '@/layouts/admin-layout';

const STATS = [
    {
        label: 'Total Users',
        icon: Users,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
    },
    {
        label: 'Payment Methods',
        icon: CreditCard,
        color: 'text-purple-500',
        bg: 'bg-purple-500/10',
    },
    {
        label: 'Copies Made',
        icon: Activity,
        color: 'text-green-500',
        bg: 'bg-green-500/10',
    },
    {
        label: 'Active Sessions',
        icon: TrendingUp,
        color: 'text-orange-500',
        bg: 'bg-orange-500/10',
    },
];

function formatTimeAgo(date: string) {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Şimdi';
    if (diffMins < 60) return `${diffMins} dk önce`;
    if (diffHours < 24) return `${diffHours} saat önce`;
    if (diffDays === 1) return 'Dün';
    if (diffDays < 7) return `${diffDays} gün önce`;
    return past.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
}

function maskIP(ip?: string) {
    if (!ip) return 'N/A';
    const parts = ip.split('.');
    if (parts.length === 4) {
        return `${parts[0]}.${parts[1]}.xx.xx`;
    }
    return ip.substring(0, 8) + '...';
}

type StatCardProps = {
    label: string;
    value: string;
    icon: React.ElementType;
    color: string;
    bg: string;
};

function StatCard({ label, value, icon, color, bg }: StatCardProps) {
    return (
        <div className="bg-[#0f0f0f] border border-white/5 p-4 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-all">
            <div
                className={`absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500 ${color}`}>
                {React.createElement(icon, { size: 48 })}
            </div>
            <div>
                <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${bg} ${color}`}>
                        {React.createElement(icon, { size: 20 })}
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-white">{value}</h3>
                <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mt-1">
                    {label}
                </p>
            </div>
        </div>
    );
}

export function AdminDashboard() {
    const [searchTerm, setSearch] = useState('');
    const [dashboardData, setDashboardData] = useState<any>(null);

    const fetchData = async () => {
        try {
            const res = await HttpService.request(Endpoints.ADMIN_DASHBOARD);
            if (res?.success) {
                setDashboardData(res?.data);
            }
        } catch (error) {
            console.error('Admin dashboard fetch error:', error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchData();
    }, []);

    return (
        <AdminLayout activeTab="overview">
            <>
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            Admin Dashboard
                        </h1>
                        <p className="text-sm text-zinc-500 mt-1">
                            Welcome back, Admin!
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
                            <Calendar
                                size={14}
                                className="text-zinc-500"
                            />
                            <span className="text-xs text-zinc-300 font-medium">
                                {new Date().toLocaleDateString('tr-TR')}
                            </span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-sm border-2 border-[#0a0a0a] shadow-lg">
                            AD
                        </div>
                    </div>
                </header>

                {/* --- STATS GRID --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        value={dashboardData?.stats?.totalUsers || 0}
                        label={STATS[0].label}
                        icon={STATS[0].icon}
                        color={STATS[0].color}
                        bg={STATS[0].bg}
                    />

                    <StatCard
                        value={dashboardData?.stats?.totalPaymentMethods || 0}
                        label={STATS[1].label}
                        icon={STATS[1].icon}
                        color={STATS[1].color}
                        bg={STATS[1].bg}
                    />

                    <StatCard
                        value={dashboardData?.stats?.copiesMade || 0}
                        label={STATS[2].label}
                        icon={STATS[2].icon}
                        color={STATS[2].color}
                        bg={STATS[2].bg}
                    />

                    <StatCard
                        value={dashboardData?.stats?.onlineUsers || 0}
                        label={STATS[3].label}
                        icon={STATS[3].icon}
                        color={STATS[3].color}
                        bg={STATS[3].bg}
                    />
                </div>

                {/* --- MAIN GRID --- */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN: Growth & Users */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Users Table */}
                        <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl overflow-hidden">
                            <div className="p-6 border-b border-white/5 flex justify-between items-center gap-4 flex-wrap">
                                <h3 className="font-bold text-lg text-white whitespace-nowrap">
                                    Son Kayıtlar
                                </h3>
                                <div className="relative w-full sm:w-auto">
                                    <Search
                                        size={16}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Kullanıcı ara..."
                                        className="bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 outline-none w-full sm:w-64 transition-all"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-zinc-400">
                                    <thead className="bg-zinc-900/50 text-xs uppercase font-bold tracking-wider text-zinc-500">
                                        <tr>
                                            <th className="px-6 py-4">
                                                Kullanıcı
                                            </th>
                                            <th className="px-6 py-4">Plan</th>
                                            <th className="px-6 py-4">Durum</th>
                                            <th className="px-6 py-4">
                                                Kayıt Tarihi
                                            </th>
                                            <th className="px-6 py-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {(dashboardData?.lastUsers || [])
                                            .filter((u: any) =>
                                                (
                                                    u.displayName ||
                                                    u.username ||
                                                    ''
                                                )
                                                    .toLowerCase()
                                                    .includes(
                                                        searchTerm.toLowerCase(),
                                                    ),
                                            )
                                            .map((user: any) => {
                                                const isDeleted =
                                                    !!user.deletedAt;
                                                const displayName =
                                                    user.displayName || 'User';
                                                const username = user.username
                                                    ? `@${user.username}`
                                                    : 'No username';
                                                return (
                                                    <tr
                                                        key={user._id}
                                                        className="hover:bg-white/[0.02] transition-colors group">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white border border-zinc-700 group-hover:border-zinc-600 transition-colors">
                                                                    {displayName
                                                                        .charAt(
                                                                            0,
                                                                        )
                                                                        .toUpperCase()}
                                                                </div>
                                                                <div>
                                                                    <p className="text-white font-medium">
                                                                        {
                                                                            displayName
                                                                        }
                                                                    </p>
                                                                    <p className="text-xs text-zinc-500">
                                                                        {
                                                                            username
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold border bg-zinc-800 text-zinc-400 border-zinc-700">
                                                                Free
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <div
                                                                    className={`w-1.5 h-1.5 rounded-full ${!isDeleted ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-red-500'}`}></div>
                                                                <span
                                                                    className={`text-xs font-medium ${!isDeleted ? 'text-green-500' : 'text-red-500'}`}>
                                                                    {!isDeleted
                                                                        ? 'Active'
                                                                        : 'Deleted'}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 font-mono text-xs">
                                                            {formatTimeAgo(
                                                                user.createdAt,
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-500 hover:text-white">
                                                                <MoreVertical
                                                                    size={16}
                                                                />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Recent Payments, Logins & Actions */}
                    <div className="space-y-6">
                        {/* --- NEW: RECENT PAYMENTS CARD --- */}
                        <div className="bg-[#0f0f0f] border border-white/5 p-6 rounded-3xl">
                            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-white">
                                <CreditCard
                                    size={18}
                                    className="text-emerald-500"
                                />
                                Son Eklenenler
                            </h3>
                            <div className="space-y-3">
                                {(dashboardData?.lastPaymentMethods || [])
                                    .slice(0, 4)
                                    .map((pay: any) => {
                                        const value = pay.decryptedValue || '';
                                        const maskedValue =
                                            value.length > 10
                                                ? `${value.substring(0, 6)}...${value.substring(value.length - 4)}`
                                                : value;
                                        return (
                                            <div
                                                key={pay._id}
                                                className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/60 hover:border-white/10 transition-all cursor-default group">
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-white/5 ${
                                                        pay.type === 'IBAN'
                                                            ? 'bg-blue-500/10 text-blue-400'
                                                            : pay.type ===
                                                                'CRYPTO'
                                                              ? 'bg-green-500/10 text-green-400'
                                                              : 'bg-pink-500/10 text-pink-400'
                                                    }`}>
                                                    {pay.type === 'IBAN' ? (
                                                        <CreditCard size={16} />
                                                    ) : pay.type ===
                                                      'CRYPTO' ? (
                                                        <Wallet size={16} />
                                                    ) : (
                                                        <Smartphone size={16} />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-zinc-200 truncate group-hover:text-white transition-colors">
                                                        {pay.label || pay.type}
                                                    </p>
                                                    <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                                                        <span className="font-mono text-[10px]">
                                                            {maskedValue}
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] text-zinc-600 whitespace-nowrap bg-black/20 px-2 py-1 rounded">
                                                    {formatTimeAgo(
                                                        pay.createdAt,
                                                    )}
                                                </span>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>

                        {/* Recent Logins */}
                        <div className="bg-[#0f0f0f] border border-white/5 p-6 rounded-3xl">
                            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-white">
                                <Lock
                                    size={18}
                                    className="text-indigo-500"
                                />
                                Son Oturumlar
                            </h3>
                            <div className="space-y-6">
                                {(dashboardData?.lastActivities || [])
                                    .slice(0, 5)
                                    .map((log: any, index: number) => {
                                        const user = log.userId;
                                        const username =
                                            user?.username ||
                                            user?.displayName ||
                                            'Unknown';
                                        const device = log.deviceType
                                            ? `${log.deviceType}`
                                            : log.browserName
                                              ? `${log.browserName} / ${log.osName || 'Unknown'}`
                                              : 'Unknown';
                                        return (
                                            <div
                                                key={log._id}
                                                className="flex items-start gap-3 relative">
                                                {index <
                                                    (
                                                        dashboardData?.lastActivities ||
                                                        []
                                                    ).slice(0, 5).length -
                                                        1 && (
                                                    <div className="absolute top-8 left-[19px] w-px h-full bg-zinc-800 -z-10"></div>
                                                )}

                                                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-[#0f0f0f] bg-green-500/10 text-green-500">
                                                    <CheckCircle size={16} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <p className="text-sm font-bold text-white">
                                                            @{username}
                                                        </p>
                                                        <span className="text-[10px] text-zinc-500 font-mono">
                                                            {formatTimeAgo(
                                                                log.lastSeen ||
                                                                    log.createdAt,
                                                            )}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1">
                                                        <Globe size={10} />{' '}
                                                        {maskIP(log.ip)}
                                                    </p>
                                                    <p className="text-[10px] text-zinc-600 mt-1 bg-zinc-900 px-2 py-0.5 rounded w-fit">
                                                        {device}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>

                        {/* System Status (Quick Actions) */}
                        <div className="bg-gradient-to-br from-indigo-900/10 to-purple-900/10 border border-indigo-500/20 p-6 rounded-3xl">
                            <h3 className="font-bold text-white mb-4 flex items-center justify-between">
                                Sistem Durumu
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                </div>
                            </h3>
                            <div className="space-y-4 mb-6">
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-zinc-400">
                                            CPU Yükü
                                        </span>
                                        <span className="text-green-400 font-mono">
                                            12%
                                        </span>
                                    </div>
                                    <div className="w-full bg-black/40 rounded-full h-1.5 overflow-hidden">
                                        <div
                                            className="bg-green-500 h-1.5 rounded-full"
                                            style={{ width: '12%' }}></div>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-zinc-400">
                                            Veritabanı
                                        </span>
                                        <span className="text-indigo-400 font-mono">
                                            45%
                                        </span>
                                    </div>
                                    <div className="w-full bg-black/40 rounded-full h-1.5 overflow-hidden">
                                        <div
                                            className="bg-indigo-500 h-1.5 rounded-full"
                                            style={{ width: '45%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-900/20 active:scale-95">
                                Bakım Modunu Başlat
                            </button>
                        </div>
                    </div>
                </div>
            </>
        </AdminLayout>
    );
}
