import z from 'zod';
import { RegexPatterns } from '@core/constants';
import { ProfileVisibility } from '@core/enums';

export const updateProfileReqDto = z.object({
    avatarUrl: z.string().optional(),
    bio: z.string().optional(),
    visibility: z.enum(ProfileVisibility).optional(),
    displayName: z.string().nonempty(),
    username: z.string().nonempty().regex(RegexPatterns.USERNAME, {
        message:
            'Username can only contain lowercase letters, numbers, and hyphens',
    }),
    persona: z.string().optional(),
});

export type IUpdateProfileReqDto = z.infer<typeof updateProfileReqDto>;
