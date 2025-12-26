'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { Clock, EyeOff, LinkIcon, RefreshCw } from 'lucide-react';
import { HttpService } from '@/core/services';
import { Endpoints } from '@/core/constants';
import { Button } from './ui/button';
import { ShareTokenConfig } from '@/core/enums';

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
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedConfig, setSelectedConfig] = useState<ShareTokenConfig>(
        ShareTokenConfig.ONE_HOUR,
    );

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
                </div>
            </DialogContent>
        </Dialog>
    );
}
