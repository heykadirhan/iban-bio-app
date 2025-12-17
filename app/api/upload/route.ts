import { NextRequest, NextResponse } from 'next/server';
import { getServerAuth, getPresignedUploadUrl, HttpStatus } from '@/lib';

export async function POST(req: NextRequest) {
    try {
        const session = await getServerAuth();
        if (!session)
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: HttpStatus.UNAUTHORIZED },
            );
        const userId = session.user.id;

        const { fileType } = await req.json();

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(fileType)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Only JPG, PNG, and WEBP are supported.',
                },
                { status: HttpStatus.BAD_REQUEST },
            );
        }

        const { uploadUrl, fileUrl } = await getPresignedUploadUrl(
            userId,
            fileType,
        );

        return NextResponse.json({
            success: true,
            data: { uploadUrl, fileUrl },
        });
    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json(
            { success: false, message: 'File upload could not be started' },
            { status: HttpStatus.INTERNAL_SERVER_ERROR },
        );
    }
}
