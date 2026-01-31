import { connectDB, getServerAuth, HttpStatus } from '@/lib';
import { UserModel } from '@/core/models';
import { NextResponse } from 'next/server';
import { getMaintenanceMode, setMaintenanceMode } from '@/lib/maintenance';

export async function GET() {
    try {
        const maintenance = await getMaintenanceMode();
        return NextResponse.json({
            success: true,
            data: { maintenance },
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: HttpStatus.BAD_REQUEST },
        );
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();

        const session = await getServerAuth();
        if (!session?.user) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: HttpStatus.UNAUTHORIZED },
            );
        }

        const user: any = await UserModel.findById(
            (session.user as any).id || (session.user as any)._id,
        ).lean();

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

        const { enabled } = await request.json();

        setMaintenanceMode(enabled);

        return NextResponse.json({
            success: true,
            data: { maintenance: enabled },
            message: enabled ? 'Bakım modu başlatıldı' : 'Bakım modu kapatıldı',
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: HttpStatus.BAD_REQUEST },
        );
    }
}
