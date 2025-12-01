import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

interface CustomUser {
    isAdmin: boolean;
    fullName: string;
    hiddenProfile: boolean;
    facility: { _id: string; name: string; slug: string } | null;
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
