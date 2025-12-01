import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';
import { connectDB } from '@/lib/db';
import { Routes } from '@core/constants';
import { AuthOptions } from 'next-auth';
import { UserModel } from '@core/models';

export const AUTH_CONFIG: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: any) {
                await connectDB();
                const user = await UserModel.findOne({
                    email: credentials.email,
                });
                if (!user) throw new Error('User not found');
                if (!user.hashedPassword)
                    throw new Error(
                        'This account was created with Google. Please sign in with Google.',
                    );
                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword,
                );
                if (!isValid) throw new Error('Incorrect password');
                return user;
            },
        }),
    ],
    pages: {
        signIn: Routes.LOGIN,
        newUser: Routes.REGISTER,
        error: Routes.LOGIN,
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({ user, account }) {
            await connectDB();
            const existingUser = await UserModel.findOne({ email: user.email });

            if (
                existingUser &&
                account?.provider === 'google' &&
                existingUser.hashedPassword
            ) {
                return false;
            }

            if (!existingUser) {
                await UserModel.create({
                    fullName: user.name,
                    email: user.email,
                    image: user.image,
                });
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user._id;

                token.facility = user.facility;
            }

            if (token.id || token.email) {
                await connectDB();

                const userFromDb = await UserModel.findOne({
                    email: token.email,
                    ...(token.id ? { _id: token.id } : {}),
                });

                if (userFromDb) {
                    token.id = userFromDb._id;
                }
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
            }

            return session;
        },
    },
};
