'use client';

import { useState } from 'react';
import {
    ArrowRight,
    User,
    Briefcase,
    ChevronLeft,
    Check,
    Sparkles,
    Wallet,
    Camera,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
    Endpoints,
    PROFILE_VISIBILITY_OPTIONS,
    RegexPatterns,
    Routes,
} from '@/core/constants';
import z from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import { HttpService } from '@/core/services';
import { ProfileVisibility } from '@/core/enums';
import { Label } from '@/components/ui/label';
import { InputUsername } from '@/components/input-username';
import { ProfileVisibilityOption } from '@/components/profile-visibility-option';
import { useSession } from 'next-auth/react';

const PERSONAS = [
    {
        id: 'personal',
        icon: <User size={24} />,
        title: 'Personal',
        desc: 'To share money with friends',
    },
    {
        id: 'freelancer',
        icon: <Briefcase size={24} />,
        title: 'Freelancer',
        desc: 'To get paid for my services',
    },
    {
        id: 'trader',
        icon: <Wallet size={24} />,
        title: 'Crypto Trader',
        desc: 'To share wallet addresses',
    },
    {
        id: 'creator',
        icon: <Camera size={24} />,
        title: 'Content Creator',
        desc: 'To receive donations and support',
    },
];

export default function OnboardingPage() {
    const session = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [usernameAvailable, setUsernameAvailable] = useState<boolean>(false);

    const formSchema = z.object({
        avatarUrl: z.string().optional(),
        displayName: z
            .string()
            .nonempty({ message: 'Please enter your full name' }),
        visibility: z.enum(ProfileVisibility, {
            error: 'Please select a visibility option',
        }),
        username: z
            .string()
            .nonempty({ message: 'Please enter a username' })
            .regex(RegexPatterns.USERNAME, {
                message:
                    'Username can only contain lowercase letters, numbers, and hyphens',
            }),
        persona: z.string().optional(),
    });
    type IFormSchema = z.infer<typeof formSchema>;
    const form = useForm<IFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            avatarUrl: '',
            displayName: '',
            username: '',
            visibility: ProfileVisibility.PUBLIC,
        },
    });
    const displayName = useWatch({
        control: form.control,
        name: 'displayName',
    });
    const username = useWatch({
        control: form.control,
        name: 'username',
    });

    const persona = useWatch({
        control: form.control,
        name: 'persona',
    });

    const submitForm = async () => {
        if (!usernameAvailable) {
            toast.error(
                'Username is not available, please choose another one.',
            );
            return;
        }

        setStep(2);
    };

    const updateProfile = async () => {
        setIsLoading(true);

        try {
            await HttpService.request(Endpoints.PROFILE, {
                method: 'PATCH',
                body: JSON.stringify({
                    displayName: form.getValues('displayName'),
                    username: form.getValues('username'),
                    persona: form.getValues('persona'),
                    avatarUrl: form.getValues('avatarUrl'),
                }),
            });

            await session.update({
                user: {
                    ...session.data?.user,
                    displayName: form.getValues('displayName'),
                    username: form.getValues('username'),
                    persona: form.getValues('persona'),
                    avatarUrl: form.getValues('avatarUrl'),
                },
            });

            setStep(3);
            setIsLoading(false);
        } catch {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center selection:bg-indigo-500/30 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-900/20 to-transparent blur-3xl pointer-events-none" />

            <div className="absolute top-0 left-0 w-full h-1 bg-zinc-900">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out"
                    style={{ width: `${(step / 3) * 100}%` }}
                />
            </div>

            <div className="w-full max-w-lg pt-6 pb-10 px-6 relative z-10">
                <div className="flex items-center justify-between mb-8">
                    {step > 1 ? (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="p-2 -ml-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all">
                            <ChevronLeft size={24} />
                        </button>
                    ) : (
                        <div className="w-10" />
                    )}{' '}
                    <div className="flex flex-col items-center">
                        <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
                            Step {step}/3
                        </span>
                    </div>
                    <div className="w-10" />
                </div>

                {step === 1 && (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(submitForm)}
                            className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-6">
                            <div className="text-center mb-10">
                                <h1 className="text-3xl font-bold mb-3">
                                    Let&apos;s create your profile!
                                </h1>
                                <p className="text-zinc-400">
                                    How should we introduce you to other users?
                                </p>
                            </div>

                            <div className="flex justify-center mb-8">
                                <div className="w-24 h-24 rounded-full bg-zinc-900 border-2 border-dashed border-zinc-700 flex items-center justify-center cursor-pointer hover:border-zinc-500 hover:bg-zinc-800 transition group relative overflow-hidden">
                                    {displayName ? (
                                        <span className="text-2xl font-bold text-zinc-300">
                                            {displayName
                                                .charAt(0)
                                                .toLocaleUpperCase()}
                                        </span>
                                    ) : (
                                        <Camera className="text-zinc-600 group-hover:text-zinc-400" />
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition text-xs font-medium">
                                        Change
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label>Full Name</Label>
                                    <FormField
                                        control={form.control}
                                        name="displayName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="E.g: John Doe"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div>
                                    <Label>Username</Label>

                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <InputUsername
                                                        field={field}
                                                        onChangeAvailablity={
                                                            setUsernameAvailable
                                                        }
                                                    />
                                                </FormControl>
                                                <p className="text-xs text-zinc-500">
                                                    This will be your unique
                                                    profile link.
                                                </p>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div>
                                <Label>Profile Visibility</Label>
                                <FormField
                                    control={form.control}
                                    name="visibility"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="grid grid-cols-3 gap-2 mb-2">
                                                {PROFILE_VISIBILITY_OPTIONS.map(
                                                    (option) => (
                                                        <button
                                                            key={option.id}
                                                            type="button"
                                                            onClick={() =>
                                                                field.onChange(
                                                                    option.id,
                                                                )
                                                            }>
                                                            <ProfileVisibilityOption
                                                                option={option}
                                                                value={
                                                                    field.value
                                                                }
                                                            />
                                                        </button>
                                                    ),
                                                )}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button
                                disabled={isLoading}
                                type="submit"
                                size="lg"
                                className="w-full">
                                Continue <ArrowRight size={16} />
                            </Button>
                        </form>
                    </Form>
                )}

                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold mb-3">
                                Choose Your Persona
                            </h1>
                            <p className="text-zinc-400">
                                Let&apos;s customize your experience for you.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {PERSONAS.map((p) => (
                                <div
                                    key={p.id}
                                    onClick={() =>
                                        form.setValue('persona', p.id)
                                    }
                                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center gap-4 group ${
                                        persona === p.id
                                            ? 'bg-indigo-600/20 border-indigo-500 ring-1 ring-indigo-500/50'
                                            : 'bg-[#151515] border-zinc-800 hover:border-zinc-600 hover:bg-[#1a1a1a]'
                                    }`}>
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                                            persona === p.id
                                                ? 'bg-indigo-500 text-white'
                                                : 'bg-zinc-900 text-zinc-400 group-hover:text-white'
                                        }`}>
                                        {p.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3
                                            className={`font-semibold text-lg ${
                                                persona === p.id
                                                    ? 'text-white'
                                                    : 'text-zinc-300'
                                            }`}>
                                            {p.title}
                                        </h3>
                                        <p className="text-sm text-zinc-500">
                                            {p.desc}
                                        </p>
                                    </div>
                                    {persona === p.id && (
                                        <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                                            <Check size={14} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <Button
                            onClick={updateProfile}
                            disabled={isLoading}
                            size="lg"
                            className="w-full mt-8">
                            Continue <ArrowRight size={16} />
                        </Button>
                    </div>
                )}

                {step === 3 && (
                    <div className="text-center animate-in zoom-in duration-500 py-10">
                        <div className="w-24 h-24 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(16,185,129,0.4)]">
                            <Sparkles className="text-white w-12 h-12 animate-pulse" />
                        </div>

                        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
                            All Set!
                        </h1>
                        <p className="text-zinc-400 text-lg mb-8 max-w-xs mx-auto">
                            Your profile has been created. Now add your first
                            payment method to start receiving payments.
                        </p>

                        <div className="bg-[#151515] border border-zinc-800 rounded-xl p-4 mb-8 max-w-xs mx-auto">
                            <p className="text-xs text-zinc-500 uppercase mb-1 tracking-widest">
                                Your Link
                            </p>
                            <p className="text-indigo-400 font-mono font-medium">
                                iban.bio/{username}
                            </p>
                        </div>

                        <Link
                            href={Routes.DASHBOARD}
                            className="w-full">
                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full">
                                Go to Dashboard <ArrowRight size={20} />
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
