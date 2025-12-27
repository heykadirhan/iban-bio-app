'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import {
    Check,
    Clock,
    EyeOff,
    LinkIcon,
    RefreshCw,
    Trash2,
} from 'lucide-react';
import { HttpService } from '@/core/services';
import { Endpoints } from '@/core/constants';
import { Button } from './ui/button';
import { ShareTokenConfig } from '@/core/enums';
import { createRoute } from '@/core/utils';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

const OPTIONS = [
    {
        id: ShareTokenConfig.FIFTEEN_MINUTES,
        label: '15 min',
        icon: Clock,
        desc: 'Quick share',
    },
    {
        id: ShareTokenConfig.ONE_HOUR,
        label: '1 hour',
        icon: Clock,
        desc: 'Standard',
    },
    {
        id: ShareTokenConfig.ONE_DAY,
        label: '1 day',
        icon: Clock,
        desc: 'Long duration',
    },
    {
        id: ShareTokenConfig.ONE_VIEW,
        label: '1 View',
        icon: EyeOff,
        desc: 'One-time use',
        color: 'text-red-400',
    },
];

export function ModalGenerateLink({
    isOpen,
    onGenerate,
    onClose,
}: {
    isOpen: boolean;
    onGenerate: (token: string) => void;
    onClose: () => void;
}) {
    const session = useSession();
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedConfig, setSelectedConfig] = useState<ShareTokenConfig>(
        ShareTokenConfig.ONE_HOUR,
    );
    const [activeLinks, setActiveLinks] = useState<any[]>([]);
    const [copiedId, setCopiedId] = useState<string>('');

    useEffect(() => {
        if (isOpen) {
            fetchActiveLinks();
        }
    }, [isOpen]);

    const fetchActiveLinks = async () => {
        const res = await HttpService.request(Endpoints.SHARE_TOKENS, {
            method: 'GET',
        });
        setActiveLinks(res?.data || []);
    };

    const generateShareToken = async () => {
        try {
            setIsGenerating(true);

            const res = await HttpService.request(Endpoints.SHARE_TOKENS, {
                method: 'POST',
                body: JSON.stringify({ config: selectedConfig }),
            });

            onGenerate(res?.data?.token);
        } finally {
            setIsGenerating(false);
        }
    };

    const deleteLink = async (id: string) => {
        await HttpService.request(Endpoints.SHARE_TOKENS, {
            method: 'DELETE',
            body: JSON.stringify({
                id,
            }),
        });

        await fetchActiveLinks();
        toast.success('Link revoked successfully');
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}>
            <DialogContent>
                <DialogTitle>Generate link</DialogTitle>

                <div className="animate-in fade-in slide-in-from-right-4">
                    <p className="text-xs text-zinc-400 mb-4">
                        This link will automatically be destroyed after the
                        duration you set or after it has been viewed.
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-6">
                        {OPTIONS.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => setSelectedConfig(opt.id)}
                                className={`
                          flex flex-col items-start p-3 rounded-xl border transition-all text-left
                          ${
                              selectedConfig === opt.id
                                  ? 'bg-indigo-600/10 border-indigo-500/50 shadow-[0_0_15px_rgba(79,70,229,0.15)]'
                                  : 'bg-zinc-900/50 border-white/5 hover:border-white/10 hover:bg-zinc-800'
                          }
                        `}>
                                <div className="flex items-center justify-between w-full mb-1">
                                    <opt.icon
                                        size={16}
                                        className={
                                            selectedConfig === opt.id
                                                ? 'text-indigo-400'
                                                : opt.color || 'text-zinc-500'
                                        }
                                    />
                                    {selectedConfig === opt.id && (
                                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                                    )}
                                </div>
                                <span
                                    className={`text-sm font-bold ${
                                        selectedConfig === opt.id
                                            ? 'text-white'
                                            : 'text-zinc-400'
                                    }`}>
                                    {opt.label}
                                </span>
                                <span className="text-[10px] text-zinc-600 mt-0.5">
                                    {opt.desc}
                                </span>
                            </button>
                        ))}
                    </div>

                    <Button
                        onClick={generateShareToken}
                        disabled={isGenerating}
                        size="lg"
                        variant="primary"
                        className="w-full">
                        {isGenerating ? (
                            <RefreshCw
                                size={18}
                                className="animate-spin"
                            />
                        ) : (
                            <>
                                Generate Link <LinkIcon size={18} />
                            </>
                        )}
                    </Button>

                    {activeLinks.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-white/5 animate-in slide-in-from-bottom-2">
                            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                Active Links ({activeLinks.length})
                            </h4>

                            <div className="space-y-2 pr-1">
                                {activeLinks.map((link) => (
                                    <div
                                        key={link._id}
                                        className="group flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all">
                                        <div className="flex flex-col gap-1 overflow-hidden">
                                            <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                                                <Clock size={10} />
                                                <span>
                                                    Expires{' '}
                                                    {new Date(
                                                        link.expiresAt,
                                                    ).toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        weekday: 'long',
                                                    })}
                                                </span>
                                                <span
                                                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                                                        link.isOneTime
                                                            ? 'bg-red-500/10 text-red-400'
                                                            : 'bg-blue-500/10 text-blue-400'
                                                    }`}>
                                                    {link.isOneTime
                                                        ? '1 View'
                                                        : 'Timed'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => {
                                                    setCopiedId(link._id);
                                                    navigator.clipboard.writeText(
                                                        `${window.location.origin}/${session.data?.user.username}?shareToken=${link.token}`,
                                                    );

                                                    setTimeout(() => {
                                                        setCopiedId('');
                                                    }, 2000);
                                                }}
                                                className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
                                                title="Copy Link">
                                                {copiedId === link._id ? (
                                                    <Check
                                                        size={14}
                                                        className="text-green-400 font-mono"
                                                    />
                                                ) : (
                                                    <LinkIcon size={14} />
                                                )}
                                            </button>
                                            <button
                                                onClick={() =>
                                                    deleteLink(link._id)
                                                }
                                                className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                                title="Revoke Link">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
