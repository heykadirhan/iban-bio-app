'use client';

import {
    Edit2,
    LinkIcon,
    Loader2,
    LogOut,
    Save,
    User,
    Lock,
    Camera,
} from 'lucide-react';
import { SectionHeader } from './components/section-header';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import z from 'zod';
import { ProfileVisibility } from '@/core/enums/profile-visibility.enum';
import { PROFILE_VISIBILITY_OPTIONS, RegexPatterns } from '@/core/constants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { InputUsername } from '@/components/input-username';
import { ProfileVisibilityOption } from '@/components/profile-visibility-option';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { HttpService } from '@/core/services';
import toast from 'react-hot-toast';

export function SettingsPage() {
    const session = useSession();
    const [usernameAvailable, setUsernameAvailable] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState(false);

    const formSchema = z.object({
        avatarUrl: z.string().optional(),
        displayName: z
            .string()
            .nonempty({ message: 'Please enter your full name' }),
        bio: z.string().optional(),
        username: z
            .string()
            .nonempty({ message: 'Please enter a username' })
            .regex(RegexPatterns.USERNAME, {
                message:
                    'Username can only contain lowercase letters, numbers, and hyphens',
            }),
        visibility: z.enum(ProfileVisibility, {
            error: 'Please select a visibility option',
        }),
    });
    type IFormSchema = z.infer<typeof formSchema>;
    const form = useForm<IFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            avatarUrl: '',
            bio: '',
            displayName: '',
            username: '',
            visibility: ProfileVisibility.PUBLIC,
        },
    });
    const displayName = form.watch('displayName');

    useEffect(() => {
        if (session.data?.user) {
            form.reset({
                avatarUrl: session.data.user.avatarUrl || '',
                bio: session.data.user.bio || '',
                username: session.data.user.username || '',
                visibility: session.data.user.visibility,
                displayName: session.data.user.displayName || '',
            });
        }
    }, [session.data, form]);

    const handleSave = async (values: IFormSchema) => {
        try {
            setIsSaving(true);

            await HttpService.request('/profile', {
                method: 'PATCH',
                body: JSON.stringify(values),
            });
            await session.update({
                user: {
                    ...session.data?.user,
                    avatarUrl: values.avatarUrl,
                    bio: values.bio,
                    username: values.username,
                    visibility: values.visibility,
                    displayName: values.displayName,
                },
            });

            toast.success('Profile updated successfully!');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            <div className="container mt-8">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSave)}
                        className="space-y-12">
                        <section>
                            <SectionHeader
                                title="Profile Information"
                                icon={User}
                            />

                            <div className="flex items-center gap-6 mb-8">
                                <div className="relative w-20 h-20 rounded-full bg-zinc-900 border-2 border-dashed border-zinc-700 flex items-center justify-center cursor-pointer hover:border-zinc-500 hover:bg-zinc-800 transition group overflow-hidden">
                                    <input
                                        type="file"
                                        className="z-10 opacity-0 absolute top-0 left-0 right-0 bottom-0 rounded-full cursor-pointer"
                                    />
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

                                <div className="flex-1">
                                    <Label>Full Name</Label>
                                    <FormField
                                        control={form.control}
                                        name="displayName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="e.g Joe Doe"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div>
                                <Label>Biography</Label>
                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea {...field} />
                                            </FormControl>
                                            <p className="text-xs text-zinc-500 text-right">
                                                {field.value?.length || 0}/160
                                            </p>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </section>

                        <section>
                            <SectionHeader
                                title="Visibility Settings"
                                icon={Lock}
                            />

                            <div className="mb-8">
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
                                                This is your unique profile
                                                link.
                                            </p>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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
                        </section>

                        <div className="pt-10 border-t border-zinc-800">
                            <Button
                                type="button"
                                onClick={() => signOut()}
                                size="lg"
                                variant="destructiveOutline"
                                className="w-full">
                                <LogOut size={18} /> Log Out
                            </Button>

                            <Button
                                size="lg"
                                type="submit"
                                disabled={isSaving}
                                variant="primary"
                                className="w-full mt-4">
                                {isSaving ? (
                                    <>
                                        <Loader2 className="size-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="size-4" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    );
}
