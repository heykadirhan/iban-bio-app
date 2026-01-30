import z from 'zod';
import { RegexPatterns } from '@core/constants';
import { ProfileVisibility } from '@core/enums';

export const updateProfileReqDto = z.object({
    avatarUrl: z.string().optional(),
    title: z
        .string()
        .max(30, { error: 'Title must be less than 30 characters' })
        .optional(),
    bio: z
        .string()
        .max(160, { error: 'Biography must be less than 160 characters' })
        .optional(),
    visibility: z.enum(ProfileVisibility).optional(),
    displayName: z.string().nonempty(),
    username: z.string().nonempty().regex(RegexPatterns.USERNAME, {
        message:
            'Username can only contain lowercase letters, numbers, and hyphens',
    }),
    persona: z.string().optional(),
});

export type IUpdateProfileReqDto = z.infer<typeof updateProfileReqDto>;
