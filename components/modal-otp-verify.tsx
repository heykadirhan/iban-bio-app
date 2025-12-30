'use client';

import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isoToCode } from '@/core/utils';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from './ui/input-otp';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { HttpService } from '@/core/services';
import { Endpoints } from '@/core/constants';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

export function ModalOtpVerify({
    isOpen,
    phone,
    country,
    onResendCode,
    onClose,
}: {
    isOpen: boolean;
    country: string;
    phone: string;
    onResendCode(): void;
    onClose: () => void;
}) {
    const session = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [remainingSeconds, setRemainingSeconds] = useState(60);

    const formSchema = z.object({
        otp: z.string().length(6, { message: 'Please enter a 6-digit code' }),
    });
    type IFormSchema = z.infer<typeof formSchema>;
    const form = useForm<IFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: '',
        },
    });

    useEffect(() => {
        setRemainingSeconds(isOpen ? 60 : 0);
    }, [isOpen]);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (remainingSeconds > 0) {
            timer = setTimeout(() => {
                setRemainingSeconds(remainingSeconds - 1);
            }, 1000);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [remainingSeconds]);

    const onSubmit = async (data: IFormSchema) => {
        try {
            setIsLoading(true);

            await HttpService.request(Endpoints.AUTH_UPDATE_PHONE, {
                method: 'POST',
                body: JSON.stringify({
                    phone: `${isoToCode(country)}${phone}`,
                    country,
                    otp: data.otp,
                }),
            });
            session.update({
                user: {
                    ...session.data?.user,
                    phone: `${isoToCode(country)}${phone}`,
                },
            });

            toast.success('Phone number updated successfully');
            onClose();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}>
            <DialogContent className="w-sm">
                <DialogTitle></DialogTitle>
                <div className="animate-in fade-in slide-in-from-right-4 w-full">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 overflow-hidden py-4 px-2">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-white">
                                    Verification Code
                                </h3>
                                <p className="text-zinc-500 text-sm mt-2">
                                    Enter the 6-digit code sent to{' '}
                                    <span className="text-zinc-400">
                                        {`${isoToCode(country)}${phone}`}
                                    </span>
                                </p>
                            </div>

                            <FormField
                                control={form.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <InputOTP
                                                {...field}
                                                maxLength={6}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                </InputOTPGroup>
                                                <InputOTPSeparator />
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    size="lg"
                                    variant="primary"
                                    className="w-full">
                                    Verify <ArrowRight size={18} />
                                </Button>
                                <button
                                    onClick={onResendCode}
                                    disabled={remainingSeconds > 0}
                                    type="button"
                                    className="mt-3 text-zinc-600 :not(:disabled):hover:text-zinc-400 transition-all text-center w-full text-sm font-medium disabled:!cursor-not-allowed">
                                    Resend Code{' '}
                                    {remainingSeconds === 0
                                        ? ''
                                        : `(${remainingSeconds} seconds)`}
                                </button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
