import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';
import { ProfileVisibility } from '../enums';

interface CustomUser {
    displayName?: string;
    phone?: string;
    country?: string;
    email?: string;
    username?: string;
    avatarUrl?: string;
    title?: string;
    bio: string;
    visibility: ProfileVisibility;
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT, CustomUser {
        id: string;
    }
}

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
        } & DefaultSession['user'] &
            CustomUser;
    }

    interface User extends DefaultUser, CustomUser {
        _id: string;
    }
}
