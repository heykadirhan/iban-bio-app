import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

interface CustomUser {
    displayName: string;
    phoneNumber: string;
    username: string;
    avatarUrl: string;
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
