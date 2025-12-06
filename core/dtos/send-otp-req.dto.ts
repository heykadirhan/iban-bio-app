import z from 'zod';
import { RegexPatterns } from '@core/constants';

export const sendOtpReqDto = z.object({
    phoneNumber: z
        .string()
        .nonempty()
        .regex(RegexPatterns.PHONE_NUMBER, 'Invalid phone number format'),
});

export type ISendOtpReqDto = z.infer<typeof sendOtpReqDto>;
