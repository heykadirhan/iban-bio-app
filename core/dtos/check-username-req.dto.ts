import z from 'zod';
import { RegexPatterns } from '@core/constants';

export const checkUsernameReqDto = z.object({
    username: z
        .string()
        .nonempty()
        .regex(RegexPatterns.USERNAME, 'Invalid username format'),
});

export type ICheckUsernameReqDto = z.infer<typeof checkUsernameReqDto>;
