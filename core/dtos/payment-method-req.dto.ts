import z from 'zod';
import { PaymentMethodType } from '@core/enums';

export const paymentMethodBaseReqDto = z.object({
    id: z.string().optional(),
    type: z
        .enum(PaymentMethodType)
        .nonoptional({ error: 'Please select a payment method type' }),
    appearance: z.string().nonempty({ error: 'Please select an appearance' }),
    title: z.string().optional(),
    isActive: z.boolean().optional(),
    order: z.number().optional(),
});

export const paymentMethodReqDto = z.discriminatedUnion('type', [
    paymentMethodBaseReqDto.extend({
        type: z.literal(PaymentMethodType.IBAN),
        meta: z.object({
            accountHolderName: z
                .string()
                .nonempty({ message: 'Please enter the account holder name' }),
            currency: z
                .string()
                .nonempty({ message: 'Please select a currency' }),
            ibanNumber: z
                .string()
                .nonempty({ message: 'Please enter the IBAN' }),
            coin: z.string().optional(),
            network: z.string().optional(),
            address: z.string().optional(),
            appName: z.string().optional(),
            number: z.string().optional(),
            linkName: z.string().optional(),
            linkUrl: z.string().optional(),
        }),
    }),
    paymentMethodBaseReqDto.extend({
        type: z.literal(PaymentMethodType.CRYPTO),
        meta: z.object({
            coin: z.string().nonempty({ message: 'Please select a coin' }),
            network: z
                .string()
                .nonempty({ message: 'Please enter the network' }),
            address: z
                .string()
                .nonempty({ message: 'Please enter the address' }),
            accountHolderName: z.string().optional(),
            currency: z.string().optional(),
            ibanNumber: z.string().optional(),
            appName: z.string().optional(),
            number: z.string().optional(),
            linkName: z.string().optional(),
            linkUrl: z.string().optional(),
        }),
    }),
    paymentMethodBaseReqDto.extend({
        type: z.literal(PaymentMethodType.DIGITAL_WALLET),
        meta: z.object({
            appName: z
                .string()
                .nonempty({ message: 'Please enter the app name' }),
            number: z
                .string()
                .nonempty({ message: 'Please enter the number/ID' }),
            accountHolderName: z.string().optional(),
            currency: z.string().optional(),
            ibanNumber: z.string().optional(),
            coin: z.string().optional(),
            network: z.string().optional(),
            address: z.string().optional(),
            linkName: z.string().optional(),
            linkUrl: z.string().optional(),
        }),
    }),
    paymentMethodBaseReqDto.extend({
        type: z.literal(PaymentMethodType.LINK),
        meta: z.object({
            linkName: z
                .string()
                .nonempty({ message: 'Please enter the link name' }),
            linkUrl: z.url({ error: 'Please enter a valid URL' }),
            accountHolderName: z.string().optional(),
            currency: z.string().optional(),
            ibanNumber: z.string().optional(),
            coin: z.string().optional(),
            network: z.string().optional(),
            address: z.string().optional(),
            appName: z.string().optional(),
            number: z.string().optional(),
        }),
    }),
]);

export type IpaymentMethodReqDto = z.infer<typeof paymentMethodReqDto>;
