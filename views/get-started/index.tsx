'use client';

import { useEffect, useState } from 'react';
import z from 'zod';
import {
    ArrowRight,
    Loader2,
    Sparkles,
    ShieldCheck,
    RepeatIcon,
} from 'lucide-react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Endpoints, Routes } from '@/core/constants';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { HttpService } from '@/core/services';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import InputPhone from '@/components/input-phone';
import { isoToCode } from '@/core/utils';

export function GetStartedPage() {
    const router = useRouter();
    const [step, setStep] = useState<1 | 2>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [remainingSeconds, setRemainingSeconds] = useState(60);

    const formStepOneSchema = z.object({
        country: z.string().nonempty({ message: 'Country is required' }),
        phone: z.string().nonempty({ message: 'Phone number is required' }),
    });
    type IFormStepOneSchema = z.infer<typeof formStepOneSchema>;
    const formStepOne = useForm<IFormStepOneSchema>({
        resolver: zodResolver(formStepOneSchema),
        defaultValues: {
            country: '',
            phone: '',
        },
    });

    const formStepTwoSchema = z.object({
        otp: z.string().length(6, { message: 'Please enter a 6-digit code' }),
    });
    type IFormStepTwoSchema = z.infer<typeof formStepTwoSchema>;
    const formStepTwo = useForm<IFormStepTwoSchema>({
        resolver: zodResolver(formStepTwoSchema),
        defaultValues: {
            otp: '',
        },
    });

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (step === 2 && remainingSeconds > 0) {
            timer = setTimeout(() => {
                setRemainingSeconds(remainingSeconds - 1);
            }, 1000);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [step, remainingSeconds]);

    const submitStepOne = async (values: IFormStepOneSchema) => {
        try {
            setIsLoading(true);

            const res = await HttpService.request(Endpoints.AUTH_SEND_OTP, {
                method: 'POST',
                body: JSON.stringify({
                    phone:
                        isoToCode(values.country) +
                        values.phone.replaceAll(' ', ''),
                }),
            });

            formStepTwo.setValue('otp', res?.data?.otp || '');

            setRemainingSeconds(60);
            setStep(2);
            setIsLoading(false);
        } catch {
            setIsLoading(false);
        }
    };

    const submitStepTwo = async () => {
        setIsLoading(true);

        const res = await signIn('credentials', {
            country: formStepOne.getValues().country,
            phone:
                isoToCode(formStepOne.getValues().country) +
                formStepOne.getValues().phone.replaceAll(' ', ''),
            otp: formStepTwo.getValues().otp,
            redirect: false,
        });

        if (res?.error) {
            toast.error(res.error);
            setIsLoading(false);
            return;
        }

        setIsLoading(false);

        router.push(Routes.DASHBOARD);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center relative overflow-hidden selection:bg-blue-500/30">
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md p-8 relative z-10">
                <div className="mb-12 text-center space-y-2">
                    <Link
                        href={Routes.ROOT}
                        className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-900/50 mb-4 ring-1 ring-white/20">
                        <Sparkles
                            className="text-white"
                            size={24}
                        />
                    </Link>
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                        iban.bio
                    </h1>
                    <p className="text-zinc-400 text-sm">
                        Sharing payment methods made simple and secure.
                    </p>
                </div>

                <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 blur"></div>

                    <div className="relative bg-[#121212] rounded-xl p-8 ring-1 ring-white/10 shadow-2xl">
                        {step === 1 && (
                            <Form {...formStepOne}>
                                <form
                                    onSubmit={formStepOne.handleSubmit(
                                        submitStepOne,
                                    )}
                                    className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div>
                                        <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                            Phone Number
                                        </label>

                                        <FormField
                                            control={formStepOne.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <InputPhone
                                                            {...field}
                                                            className="mt-2"
                                                            onPhoneChange={
                                                                field.onChange
                                                            }
                                                            onCountryChange={(
                                                                val,
                                                            ) =>
                                                                formStepOne.setValue(
                                                                    'country',
                                                                    val,
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <button
                                        disabled={isLoading}
                                        type="submit"
                                        className="mt-6 w-full bg-white text-black hover:bg-zinc-200 h-14 rounded-lg font-bold text-base transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                        {isLoading ? (
                                            <Loader2 className="animate-spin" />
                                        ) : (
                                            <>
                                                Continue{' '}
                                                <ArrowRight size={18} />
                                            </>
                                        )}
                                    </button>

                                    <p className="text-xs text-center text-zinc-600 max-w-48 mx-auto">
                                        By continuing, you agree to our{' '}
                                        <Link
                                            href={Routes.TERMS}
                                            target="_blank"
                                            className="border-b border-dashed border-zinc-600 hover:border-white hover:text-white transition-all">
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link
                                            href={Routes.PRIVACY}
                                            target="_blank"
                                            className="border-b border-dashed border-zinc-600 hover:border-white hover:text-white transition-all">
                                            Privacy Policy
                                        </Link>
                                    </p>
                                </form>
                            </Form>
                        )}

                        {step === 2 && (
                            <Form {...formStepTwo}>
                                <form
                                    onSubmit={formStepTwo.handleSubmit(
                                        submitStepTwo,
                                    )}
                                    className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="text-center">
                                        <h3 className="text-xl font-semibold text-white">
                                            Verification Code
                                        </h3>
                                        <p className="text-zinc-500 text-sm mt-2">
                                            Enter the 6-digit code sent to{' '}
                                            <span className="text-zinc-400">
                                                {`${isoToCode(
                                                    formStepOne.getValues()
                                                        .country,
                                                )} ${
                                                    formStepOne.getValues()
                                                        .phone
                                                }`}
                                            </span>
                                        </p>
                                    </div>

                                    <FormField
                                        control={formStepTwo.control}
                                        name="otp"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <InputOTP
                                                        {...field}
                                                        maxLength={6}>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot
                                                                index={0}
                                                            />
                                                            <InputOTPSlot
                                                                index={1}
                                                            />
                                                            <InputOTPSlot
                                                                index={2}
                                                            />
                                                        </InputOTPGroup>
                                                        <InputOTPSeparator />
                                                        <InputOTPGroup>
                                                            <InputOTPSlot
                                                                index={3}
                                                            />
                                                            <InputOTPSlot
                                                                index={4}
                                                            />
                                                            <InputOTPSlot
                                                                index={5}
                                                            />
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
                                            className="w-full">
                                            Verify <ArrowRight size={18} />
                                        </Button>
                                        <button
                                            onClick={() =>
                                                submitStepOne(
                                                    formStepOne.getValues(),
                                                )
                                            }
                                            disabled={remainingSeconds > 0}
                                            type="button"
                                            className="mt-3 text-zinc-600 :not(:disabled):hover:text-zinc-400 transition-all text-center w-full text-sm font-medium disabled:!cursor-not-allowed">
                                            Resend Code{' '}
                                            {remainingSeconds === 0
                                                ? ''
                                                : `(${remainingSeconds} seconds)`}
                                        </button>
                                    </div>

                                    <Button
                                        onClick={() => setStep(1)}
                                        className="-mt-3 text-zinc-600 hover:text-zinc-400 transition-all w-full"
                                        size="lg"
                                        variant="ghost">
                                        <RepeatIcon size={18} />
                                        Change Phone Number
                                    </Button>
                                </form>
                            </Form>
                        )}
                    </div>
                </div>

                <div className="mt-8 flex justify-center items-center gap-2 opacity-50">
                    <ShieldCheck
                        size={14}
                        className="text-green-500"
                    />
                    <span className="text-[10px] text-zinc-500 tracking-widest uppercase">
                        End-to-End Encrypted
                    </span>
                </div>
            </div>
        </div>
    );
}
