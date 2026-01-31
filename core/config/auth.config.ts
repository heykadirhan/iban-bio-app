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
            async authorize({ phone, country, otp }: any): Promise<any> {
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
                    ...user.toObject(),
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
                        email: user.email,
                    });
                }
            }
            return true;
        },

        async jwt({ token, user, account, trigger, session }) {
            if (account && user) {
                if (account.provider === 'google') {
                    await connectDB();
                    const dbUser = await UserModel.findOne({
                        email: user.email,
                    });

                    if (dbUser) {
                        token.id = dbUser._id.toString();
                        token._id = dbUser._id.toString();
                        token.username = dbUser.username;
                        token.displayName = dbUser.displayName;
                        token.avatarUrl = dbUser.avatarUrl;
                        token.phone = dbUser.phone;
                        token.country = dbUser.country;
                        token.visibility = dbUser.visibility;
                        token.isAdmin = dbUser.isAdmin;
                    }
                } else {
                    const u = user as any;
                    token.id = u.id;
                    token._id = u.id;
                    token.username = u.username;
                    token.displayName = u.displayName;
                    token.avatarUrl = u.avatarUrl;
                    token.phone = u.phone;
                    token.country = u.country;
                    token.visibility = u.visibility;
                    token.isAdmin = u.isAdmin;
                }
            } else if (token?._id) {
                await connectDB();
                const freshUser = await UserModel.findById(token._id);

                if (freshUser) {
                    token.displayName = freshUser.displayName;
                    token.avatarUrl = freshUser.avatarUrl;
                    token.username = freshUser.username;
                    token.visibility = freshUser.visibility;
                    token.isAdmin = freshUser.isAdmin;
                }
            }

            if (trigger === 'update' && session) {
                token = { ...token, ...session.user };
            }

            return token;
        },

        async session({ session, token }) {
            if (token && session.user) {
                session.user = token as any;
            }
            return session;
        },
    },
};
