import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { connectDB } from '@/lib/db';
import { Routes } from '@core/constants';
import { AuthOptions } from 'next-auth';
import { OTPModel, UserModel } from '@core/models';
import { ProfileVisibility } from '../enums';

export const AUTH_CONFIG: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                phoneNumber: { label: 'Phone Number', type: 'text' },
                otp: { label: 'OTP Code', type: 'text' },
            },
            async authorize(credentials) {
                await connectDB();

                const phoneNumber = credentials?.phoneNumber;
                const otp = credentials?.otp;

                if (!phoneNumber || !otp) {
                    throw new Error('Phone number and OTP are required');
                }

                const otpRecord = await OTPModel.findOne({ phoneNumber, otp });

                if (!otpRecord) {
                    throw new Error('Invalid OTP code');
                }

                let user = await UserModel.findOne({ phoneNumber });

                if (!user) {
                    user = await UserModel.create({
                        phoneNumber,
                    });
                }

                await OTPModel.deleteOne({ _id: otpRecord._id });

                return {
                    id: user._id.toString(),
                    _id: user._id.toString(),
                    phoneNumber: user.phoneNumber,
                    displayName: user.displayName,
                    username: user.username,
                    avatarUrl: user.avatarUrl,
                    bio: user.bio,
                    visibility: user.visibility,
                };
            },
        }),
    ],
    pages: {
        signIn: Routes.GET_STARTED,
        newUser: Routes.GET_STARTED,
        error: Routes.GET_STARTED,
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'google') {
                await connectDB();

                const googleId = account.providerAccountId;

                let existingUser = await UserModel.findOne({ googleId });

                if (!existingUser) {
                    existingUser = await UserModel.create({
                        googleId: googleId,
                        displayName: user.name,
                        avatarUrl: user.image,
                        phoneNumber: null,
                    });
                }

                user.id = existingUser._id.toString();
                (user as any).username = existingUser.username;
                (user as any).phoneNumber = existingUser.phoneNumber;
            }
            return true;
        },

        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.phoneNumber = (user as any).phoneNumber;
                token.username = (user as any).username;
                token.displayName =
                    (user as any).name || (user as any).displayName;
                token.avatarUrl =
                    (user as any).image || (user as any).avatarUrl;
                token.bio = (user as any).bio;
                token.visibility = (user as any).visibility;
            }

            if (trigger === 'update' && session) {
                token = { ...token, ...session.user };
            }

            return token;
        },

        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.phoneNumber = token.phoneNumber as string;
                session.user.displayName = token.displayName as string;
                session.user.username = token.username as string;
                session.user.avatarUrl = token.avatarUrl as string;
                session.user.bio = token.bio as string;
                session.user.visibility = token.visibility as ProfileVisibility;
            }
            return session;
        },
    },
};
