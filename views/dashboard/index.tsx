'use client';
import React, { useState } from 'react';
import {
    Plus,
    MoreVertical,
    Eye,
    Share2,
    Copy,
    Trash2,
    Edit2,
    Power,
    TrendingUp,
    Wallet,
    ArrowUpRight,
} from 'lucide-react';

// MOCK DATA
const INITIAL_DATA = [
    {
        id: 1,
        title: 'İş Bankası',
        type: 'IBAN',
        value: 'TR12...5678',
        isActive: true,
        stats: 124,
    },
    {
        id: 2,
        title: 'Binance (USDT)',
        type: 'CRYPTO',
        value: '0x123...abc',
        isActive: true,
        stats: 45,
    },
    {
        id: 3,
        title: 'Papara',
        type: 'WALLET',
        value: '1552233',
        isActive: false,
        stats: 12,
    },
];

export function DashboardPage() {
    const [methods, setMethods] = useState(INITIAL_DATA);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('active'); // 'active' | 'archived'

    // Basit Silme Fonksiyonu
    const handleDelete = (id) => {
        if (confirm('Silmek istediğine emin misin?')) {
            setMethods(methods.filter((m) => m.id !== id));
        }
    };

    // Aktif/Pasif Toggle
    const toggleStatus = (id) => {
        setMethods(
            methods.map((m) =>
                m.id === id ? { ...m, isActive: !m.isActive } : m,
            ),
        );
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans pb-24 relative overflow-hidden">
            {/* Background Glows */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] bg-indigo-900/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] left-[-10%] w-[250px] h-[250px] bg-purple-900/10 rounded-full blur-[80px]" />
            </div>

            <div className="max-w-md mx-auto relative z-10">
                {/* 1. HEADER & PROFILE BAR */}
                <div className="p-6 pt-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                            <span className="font-bold text-sm">CY</span>
                        </div>
                    </div>

                    {/* Profile Link Card */}
                    <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-xl">
                        <div>
                            <p className="text-xs text-zinc-400 mb-1">
                                Your Link
                            </p>
                            <p className="text-sm font-mono text-primary font-medium">
                                iban.bio/cem
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                title="Copy">
                                <Copy
                                    size={16}
                                    className="text-zinc-300"
                                />
                            </button>
                            <button
                                className="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors text-white"
                                title="Preview">
                                <ArrowUpRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. STATS BAR */}
                <div className="grid grid-cols-2 gap-4 px-6 mb-8">
                    <div className="bg-[#121212] border border-zinc-800 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-2 text-zinc-400">
                            <Eye size={16} />
                            <span className="text-xs font-medium uppercase">
                                Page Views
                            </span>
                        </div>
                        <p className="text-2xl font-bold">1,240</p>
                        <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                            <TrendingUp size={12} /> +12% increase
                        </p>
                    </div>
                    <div className="bg-[#121212] border border-zinc-800 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-2 text-zinc-400">
                            <Copy size={16} />
                            <span className="text-xs font-medium uppercase">
                                Copies
                            </span>
                        </div>
                        <p className="text-2xl font-bold">385</p>
                        <p className="text-xs text-zinc-500 mt-1">
                            Total copies made
                        </p>
                    </div>
                </div>

                {/* 3. CONTENT AREA */}
                <div className="bg-[#0f0f0f] min-h-[500px] rounded-t-[40px] border-t border-white/5 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
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
                        {methods.map((item) => (
                            <div
                                key={item.id}
                                className="group relative bg-[#181818] hover:bg-[#202020] border border-zinc-800 rounded-2xl p-4 transition-all">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        {/* Icon Placeholder */}
                                        <div
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                                                item.isActive
                                                    ? 'bg-zinc-800 text-white'
                                                    : 'bg-zinc-900 text-zinc-600'
                                            }`}>
                                            {item.type === 'IBAN'
                                                ? '🏦'
                                                : item.type === 'CRYPTO'
                                                ? '🪙'
                                                : '👛'}
                                        </div>
                                        <div>
                                            <h3
                                                className={`font-medium ${
                                                    !item.isActive &&
                                                    'text-zinc-500 line-through'
                                                }`}>
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-zinc-500 font-mono">
                                                {item.value}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Context Menu (Edit/Delete) - Normalde Dropdown olur, basitlik için yan yana koydum */}
                                    <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() =>
                                                toggleStatus(item.id)
                                            }
                                            className={`p-2 rounded-full ${
                                                item.isActive
                                                    ? 'text-green-500 hover:bg-green-500/10'
                                                    : 'text-zinc-600 hover:bg-zinc-800'
                                            }`}
                                            title="Aktif/Pasif">
                                            <Power size={16} />
                                        </button>
                                        <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-full">
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                            className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-full">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Footer Stats inside card */}
                                {item.isActive && (
                                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-4 text-xs text-zinc-500">
                                        <span className="flex items-center gap-1">
                                            <Copy size={10} /> {item.stats}{' '}
                                            times copied
                                        </span>
                                        <span className="flex items-center gap-1 text-green-500/70">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>{' '}
                                            Active
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Boş Durum (Eğer eleman yoksa) */}
                        {methods.length === 0 && (
                            <div className="text-center py-10 opacity-50">
                                <Wallet
                                    size={48}
                                    className="mx-auto mb-3 text-zinc-600"
                                />
                                <p className="text-zinc-400">
                                    Henüz hiç ödeme yöntemi eklemedin.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* 4. FAB (FLOATING ACTION BUTTON) */}
                <div className="fixed bottom-6 right-6 z-50">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)] flex items-center justify-center transition-transform hover:scale-105 active:scale-95">
                        <Plus size={28} />
                    </button>
                </div>

                {/* 5. ADD MODAL (Basit Gösterim) */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0">
                        <div
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}></div>
                        <div className="bg-[#1a1a1a] border border-zinc-700 w-full max-w-sm rounded-2xl p-6 relative animate-in slide-in-from-bottom-10 duration-300">
                            <h3 className="text-lg font-bold mb-4">
                                Yeni Ödeme Yöntemi
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-zinc-400 uppercase font-bold">
                                        Başlık
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 mt-1 text-white focus:border-indigo-500 outline-none"
                                        placeholder="Örn: Şirket IBAN"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-zinc-400 uppercase font-bold">
                                        IBAN / Adres
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 mt-1 text-white focus:border-indigo-500 outline-none font-mono"
                                        placeholder="TR..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3 mt-2">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="py-3 rounded-lg bg-zinc-800 text-zinc-300 font-medium">
                                        İptal
                                    </button>
                                    <button className="py-3 rounded-lg bg-indigo-600 text-white font-bold">
                                        Kaydet
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
