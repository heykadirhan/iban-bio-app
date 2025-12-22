import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { connectDB } from '@/lib/db';
import { Routes } from '@core/constants';
import { AuthOptions } from 'next-auth';
import { UserModel } from '@core/models';
import { checkVerificationCode } from '@/lib';

export const AUTH_CONFIG: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                country: { label: 'Country', type: 'text' },
                phone: { label: 'Phone Number', type: 'text' },
                otp: { label: 'OTP Code', type: 'text' },
            },
            async authorize({ phone, country, otp }: any) {
                await connectDB();

                if (!phone || !otp || !country) {
                    throw new Error(
                        'Phone number, country, and OTP are required',
                    );
                }

                const otpResult = await checkVerificationCode(phone, otp);
                if (!otpResult.valid && process.env.NODE_ENV === 'production') {
                    throw new Error('Invalid OTP code');
                }

                let user = await UserModel.findOneDeleted({
                    phone,
                    country,
                });

                if (!user) {
                    user = await UserModel.create({
                        phone,
                        country,
                    });
                }

                if (user.deletedAt) {
                    throw new Error(
                        'This account has been deleted. Please contact if you want to restore it.',
                    );
                }

                return {
                    id: user._id.toString(),
                    _id: user._id.toString(),
                    phone: user.phone,
                    country: user.country,
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
                        phone: null,
                    });
                }

                user.id = existingUser._id.toString();
                (user as any).username = existingUser.username;
                (user as any).phone = existingUser.phone;
            }
            return true;
        },

        async jwt({ token, user, trigger, session }) {
            if (user) {
                token = user as any;
            }

            if (trigger === 'update' && session) {
                token = { ...token, ...session.user };
            }

            return token;
        },

        async session({ session, token }) {
            if (token && session.user) {
                session.user = token;
            }
            return session;
        },
    },
};
