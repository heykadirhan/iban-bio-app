import { AUTH_CONFIG } from '@/core/config';
import {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from 'next';
import { getServerSession } from 'next-auth';

export function auth(
    ...args:
        | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, AUTH_CONFIG);
}
