import { ActivityModel, PaymentMethodModel, UserModel } from '@/core/models';
import { ShareTokenModel } from '@/core/models/share-token.model';
import { connectDB, decrypt, getServerAuth, HttpStatus } from '@/lib';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();

        const session = await getServerAuth();
        if (!session?.user) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: HttpStatus.UNAUTHORIZED },
            );
        }

        const user: any = await UserModel.findById(session.user.id).lean();

        if (!user)
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: HttpStatus.NOT_FOUND },
            );
        if (!user.isAdmin) {
            return NextResponse.json(
                { success: false, message: 'Forbidden' },
                { status: HttpStatus.FORBIDDEN },
            );
        }

        const lastPaymentMethods = await PaymentMethodModel.find()
            .lean()
            .sort({ createdAt: 1 })
            .limit(20)
            .select('+iv +copyCount');

        const lastUsers = await UserModel.find()
            .lean()
            .sort({ createdAt: -1 })
            .limit(20);

        const lastActivities = await ActivityModel.find()
            .lean()
            .sort({ createdAt: -1 })
            .limit(20)
            .populate('userId', 'username displayName');

        return NextResponse.json({
            success: true,
            data: {
                stats: {
                    totalUsers: await UserModel.countDocuments(),
                    totalPaymentMethods:
                        await PaymentMethodModel.countDocuments(),
                    copiesMade: await UserModel.aggregate([
                        {
                            $group: {
                                _id: null,
                                total: { $sum: '$copyCount' },
                            },
                        },
                    ]).then((res) => (res[0] ? res[0].total : 0)),
                    onlineUsers: await ActivityModel.distinct('userId', {
                        lastSeen: {
                            $gte: new Date(Date.now() - 5 * 60 * 1000),
                        },
                    }).then((users) => users.length),
                },
                lastPaymentMethods: lastPaymentMethods.map((method) => ({
                    ...method,
                    decryptedValue: decrypt({
                        content: method.encryptedValue,
                        iv: method.iv,
                    }),
                    encryptedValue: undefined,
                    iv: undefined,
                })),
                lastUsers,
                lastActivities,
            },
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: HttpStatus.BAD_REQUEST },
        );
    }
}
