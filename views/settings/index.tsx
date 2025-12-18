'use client';

import { Loader2, Save, User, Lock, Trash } from 'lucide-react';
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
import {
    PROFILE_VISIBILITY_OPTIONS,
    RegexPatterns,
    Routes,
} from '@/core/constants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { InputUsername } from '@/components/input-username';
import { ProfileVisibilityOption } from '@/components/profile-visibility-option';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { HttpService } from '@/core/services';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { AvatarUpload } from '@/components/avatar-upload';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

export function SettingsPage() {
    const router = useRouter();
    const session = useSession();
    const [usernameAvailable, setUsernameAvailable] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deletePopoverOpen, setDeletePopoverOpen] = useState<boolean>(false);

    const formSchema = z.object({
        avatarUrl: z.string().optional(),
        displayName: z
            .string()
            .nonempty({ message: 'Please enter your full name' }),
        bio: z
            .string()
            .max(160, { error: 'Biography must be less than 160 characters' })
            .optional(),
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

    const deleteAccount = async () => {
        try {
            setIsDeleting(true);

            await HttpService.request('/profile/delete', {
                method: 'POST',
            });

            await signOut();
            router.push(Routes.ROOT);
            toast.success(
                'Account deleted successfully. We hope to see you again soon!',
            );
        } catch {
            setIsDeleting(false);
        }
    };

    const handleSave = async (values: IFormSchema) => {
        if (!usernameAvailable) {
            toast.error(
                'Username is not available. Please choose another one.',
            );
            return;
        }

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

            router.push(Routes.DASHBOARD);
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
                                <AvatarUpload
                                    displayName={displayName}
                                    onUploadSuccess={(fileUrl) =>
                                        form.setValue('avatarUrl', fileUrl)
                                    }
                                />

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
                                            <FormMessage />

                                            <p className="text-xs text-zinc-500 text-right">
                                                {field.value?.length || 0}/160
                                            </p>
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

                        <div className="pt-6 border-t border-zinc-800">
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

                            <Popover
                                open={deletePopoverOpen}
                                onOpenChange={setDeletePopoverOpen}>
                                <PopoverTrigger className="w-full">
                                    <Button
                                        disabled={isDeleting}
                                        type="button"
                                        variant="destructiveOutline"
                                        size="lg"
                                        className="w-full mt-6">
                                        <Trash size={16} />
                                        Delete Account
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-sm"
                                    sideOffset={0}>
                                    <p className="font-semibold">
                                        Delete Account
                                    </p>
                                    <p className="mt-2 text-sm text-neutral-500">
                                        Are you sure you want to delete your
                                        account? This action cannot be undone
                                        and all your data will be permanently
                                        removed.
                                    </p>

                                    <div className="mt-3 flex items-center gap-3">
                                        <Button
                                            onClick={() =>
                                                setDeletePopoverOpen(false)
                                            }
                                            type="button"
                                            variant="dashed"
                                            size="sm">
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={deleteAccount}
                                            disabled={isDeleting}
                                            type="button"
                                            size="sm"
                                            variant="destructiveOutline">
                                            Delete my account
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    );
}
