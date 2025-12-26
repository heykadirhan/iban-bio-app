import z from 'zod';
import { ShareTokenConfig } from '@core/enums';

export const createShareTokenReqDto = z.object({
    config: z.enum(ShareTokenConfig).nonoptional(),
});

export type ICreateShareTokenReqDto = z.infer<typeof createShareTokenReqDto>;
