'use client';
import { useState, useEffect } from 'react';
import { AlertTriangle, Sparkles } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from './ui/input-group';
import { PaymentMethodType } from '@/core/enums';
import z from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { cn } from '@/lib/utils';
import { paymentMethodReqDto } from '@/core/dtos';
import { HttpService } from '@/core/services';
import { APPERANCE_OPTIONS, Endpoints } from '@/core/constants';
import toast from 'react-hot-toast';
import PaymentCard from './payment-card';

export default function ModalPayment({
    isOpen,
    initialData,
    onClose,
}: {
    isOpen: boolean;
    initialData?: any;
    onClose: () => void;
}) {
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = paymentMethodReqDto;
    type IFormSchema = z.infer<typeof formSchema>;
    const form = useForm<IFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: PaymentMethodType.IBAN,
            appearance: APPERANCE_OPTIONS[0].id,
            title: '',
            meta: {
                accountHolderName: '',
                ibanNumber: '',
                address: '',
                coin: '',
                network: '',
                appName: '',
                number: '',
                linkName: '',
                linkUrl: '',
            },
        },
    });
    const formValue = useWatch({
        control: form.control,
    });
    const type = useWatch({
        control: form.control,
        name: 'type',
    });
    const appearance = useWatch({
        control: form.control,
        name: 'appearance',
    });
    const coin = useWatch({
        control: form.control,
        name: 'meta.coin',
    });

    useEffect(() => {
        if (isOpen) {
            form.reset();
            form.resetField('meta');

            if (!initialData) return;

            form.setValue('type', initialData.type);
            form.setValue(
                'appearance',
                initialData.appearance || APPERANCE_OPTIONS[0].id,
            );
            form.setValue('title', initialData.title || '');

            for (const key in initialData.meta) {
                form.setValue(`meta.${key}` as any, initialData.meta[key]);
            }
        }
    }, [isOpen, form]);

    const submitForm = async (values: IFormSchema) => {
        if (initialData) {
            values['id'] = initialData._id;
        }

        try {
            setIsLoading(true);

            await HttpService.request(Endpoints.PAYMENT_METHODS, {
                method: initialData ? 'PATCH' : 'POST',
                body: JSON.stringify(values),
            });

            toast.success(
                initialData
                    ? 'Payment method updated successfully!'
                    : 'Payment method added to your profile!',
            );
            onClose();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}>
            <DialogContent className="min-w-[80vw] p-0 flex flex-col md:flex-row">
                <div className="p-6 md:w-3/5 flex flex-col">
                    <DialogHeader className="mb-6">
                        <div className="flex items-center gap-2 text-blue-500 mb-2">
                            <Sparkles size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">
                                Create New
                            </span>
                        </div>
                        <DialogTitle>
                            {initialData
                                ? 'Edit Payment Method'
                                : 'Add Payment Method'}
                        </DialogTitle>
                        <DialogDescription>
                            {initialData
                                ? 'Modify your existing payment method details.'
                                : 'Add a new payment method to your profile by filling out the form below.'}
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(submitForm)}>
                            <div className="row">
                                <div className="col-12 mb-4">
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Tabs
                                                        value={field.value}
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        className="w-full flex-1">
                                                        <TabsList className="w-full grid grid-cols-4">
                                                            {Object.values(
                                                                PaymentMethodType,
                                                            ).map((type) => (
                                                                <TabsTrigger
                                                                    key={type}
                                                                    value={
                                                                        type
                                                                    }>
                                                                    {
                                                                        {
                                                                            [PaymentMethodType.IBAN]:
                                                                                'IBAN',
                                                                            [PaymentMethodType.CRYPTO]:
                                                                                'Crypto',
                                                                            [PaymentMethodType.APP]:
                                                                                'Wallet',
                                                                            [PaymentMethodType.LINK]:
                                                                                'Link',
                                                                        }[type]
                                                                    }
                                                                </TabsTrigger>
                                                            ))}
                                                        </TabsList>
                                                    </Tabs>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="col-12 mb-4">
                                    <Label>Card Appearance</Label>
                                    <div className="flex gap-3">
                                        {APPERANCE_OPTIONS.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() =>
                                                    form.setValue(
                                                        'appearance',
                                                        item.id,
                                                    )
                                                }
                                                type="button"
                                                className={`w-8 h-8 rounded-full bg-gradient-to-br ${
                                                    item.class
                                                } ring-2 ring-offset-2 ring-offset-[#0a0a0a] transition-all hover:scale-110 ${
                                                    item.id === appearance
                                                        ? 'ring-white'
                                                        : 'ring-transparent opacity-50 hover:opacity-100'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* <div className="col-12 mb-4">
                                    <Label>Title (Optional)</Label>
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="e.g. Salary Account"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div> */}

                                {/* START: IBAN */}

                                <div
                                    className={cn('col-12 mb-4', {
                                        hidden: type !== PaymentMethodType.IBAN,
                                    })}>
                                    <Label>Account Holder Name</Label>
                                    <FormField
                                        control={form.control}
                                        name="meta.accountHolderName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="e.g. Joe Doe"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div
                                    className={cn('col-12 mb-4', {
                                        hidden: type !== PaymentMethodType.IBAN,
                                    })}>
                                    <Label>IBAN Number</Label>
                                    <FormField
                                        control={form.control}
                                        name="meta.ibanNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <InputGroup>
                                                        <InputGroupInput
                                                            {...field}
                                                            placeholder="TR00 0000 0000 0000 0000 0000 00"
                                                            onChange={(e) =>
                                                                field.onChange({
                                                                    ...e,
                                                                    target: {
                                                                        ...e.target,
                                                                        value: e.target.value.toUpperCase(),
                                                                    },
                                                                })
                                                            }
                                                        />
                                                        <InputGroupAddon>
                                                            <InputGroupText className="pr-1">
                                                                #
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* END: IBAN */}

                                {type === PaymentMethodType.CRYPTO && (
                                    <>
                                        <div className="col-12 mb-4">
                                            <Label>Coin</Label>
                                            <FormField
                                                control={form.control}
                                                name="meta.coin"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="e.g. BTC"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="col-12 mb-4">
                                            <Label>Network</Label>
                                            <FormField
                                                control={form.control}
                                                name="meta.network"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="e.g. BEP20"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="col-12 mb-4">
                                            <Label>Address</Label>
                                            <FormField
                                                control={form.control}
                                                name="meta.address"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <InputGroup>
                                                                <InputGroupInput
                                                                    {...field}
                                                                    placeholder="0x0000...0000"
                                                                />
                                                                <InputGroupAddon>
                                                                    <InputGroupText className="pr-1">
                                                                        Ξ
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                            </InputGroup>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="col-12 mt-2">
                                            <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 flex items-start gap-2 rounded-md">
                                                <AlertTriangle
                                                    size={14}
                                                    className="text-amber-500 shrink-0 mt-0.5"
                                                />
                                                <p className="text-sm text-amber-200/80">
                                                    Make sure you have selected
                                                    the correct network. Assets
                                                    sent to unsupported networks
                                                    may be lost.
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {type === PaymentMethodType.APP && (
                                    <>
                                        <div className="col-12 mb-4">
                                            <Label>App Name</Label>
                                            <FormField
                                                control={form.control}
                                                name="meta.appName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="e.g. PayPal"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="col-12 mb-4">
                                            <Label>User ID / Number</Label>
                                            <FormField
                                                control={form.control}
                                                name="meta.number"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <InputGroup>
                                                                <InputGroupInput
                                                                    {...field}
                                                                    placeholder="user123"
                                                                />
                                                                <InputGroupAddon>
                                                                    <InputGroupText className="pr-1">
                                                                        @
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                            </InputGroup>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </>
                                )}

                                {type === PaymentMethodType.LINK && (
                                    <>
                                        <div className="col-12 mb-4">
                                            <Label>Link Name</Label>
                                            <FormField
                                                control={form.control}
                                                name="meta.linkName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="e.g Patreon"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="col-12 mb-4">
                                            <Label>Link URL</Label>
                                            <FormField
                                                control={form.control}
                                                name="meta.linkUrl"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="https://example.com"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="mt-8 pb-6 flex justify-end gap-3 sticky bottom-0 bg-[#0a0a0a] border-t border-zinc-800 pt-4">
                                <Button
                                    variant="ghost"
                                    type="button"
                                    onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    disabled={isLoading}
                                    variant="primary"
                                    type="submit">
                                    {initialData
                                        ? 'Save Changes'
                                        : 'Add Payment Method'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>

                <div className="md:w-2/5 bg-[#121212] sticky top-0 border-l border-zinc-800 p-6 flex flex-col justify-center items-center relative">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                    <div className="relative w-full z-10 space-y-6">
                        <div className="text-center space-y-1">
                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                Live Preview
                            </p>
                            <p className="text-zinc-400 text-sm">
                                This is how it looks on your profile.
                            </p>
                        </div>

                        <div className="transform md:scale-100 scale-90 transition-all hover:scale-[1.02] cursor-default">
                            <PaymentCard
                                isPreview
                                paymentData={{
                                    ...formValue,
                                    copyCount: 0,
                                    isActive: true,
                                    decryptedValue: {
                                        [PaymentMethodType.IBAN]:
                                            formValue?.meta?.ibanNumber,
                                        [PaymentMethodType.CRYPTO]:
                                            formValue?.meta?.address,
                                        [PaymentMethodType.APP]:
                                            formValue?.meta?.number,
                                        [PaymentMethodType.LINK]:
                                            formValue?.meta?.linkUrl,
                                    }[formValue.type as PaymentMethodType],
                                }}
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
