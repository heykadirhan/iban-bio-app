'use client';
import React, { PropsWithChildren, useState } from 'react';
import {
    ShieldAlert,
    LogOut,
    LayoutDashboard,
    Users,
    Database,
    Lock,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

type AdminLayoutProps = PropsWithChildren<{
    activeTab?: string;
}>;

export function AdminLayout({
    children,
    activeTab = 'overview',
}: AdminLayoutProps) {
    const router = useRouter();
    const [currentTab, setCurrentTab] = useState(activeTab);

    const handleTabChange = (tab: string) => {
        setCurrentTab(tab);
        // Navigate to the respective admin page
        // router.push(`/admin/${tab}`);
    };

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/' });
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden">
            {/* --- SIDEBAR --- */}
            <aside className="w-64 border-r border-white/5 bg-[#0a0a0a] hidden md:flex flex-col">
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center gap-2 text-indigo-500">
                        <ShieldAlert size={24} />
                        <span className="font-bold text-lg tracking-tight text-white">
                            God Mode
                        </span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {['Overview', 'Users', 'Payments', 'Security'].map(
                        (tab) => {
                            const key = tab.toLowerCase();
                            const Icon =
                                key === 'overview'
                                    ? LayoutDashboard
                                    : key === 'users'
                                      ? Users
                                      : key === 'payments'
                                        ? Database
                                        : Lock;
                            return (
                                <button
                                    key={key}
                                    onClick={() => handleTabChange(key)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${currentTab === key ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20' : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}`}>
                                    <Icon size={18} /> {tab}
                                </button>
                            );
                        },
                    )}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
                        <LogOut size={18} /> Log Out
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 p-6 lg:p-8 overflow-y-auto h-screen bg-black/20">
                {children}
            </main>
        </div>
    );
}
