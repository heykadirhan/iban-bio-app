import z from 'zod';
import { RegexPatterns } from '@core/constants';

export const updatePhoneReqDto = z.object({
    phone: z
        .string()
        .nonempty()
        .regex(RegexPatterns.PHONE_NUMBER, 'Invalid phone number format'),
    country: z.string().nonempty('Country is required'),
    otp: z.string().nonempty().length(6, 'OTP code must be 6 digits'),
});

export type IUpdatePhoneReqDto = z.infer<typeof updatePhoneReqDto>;
