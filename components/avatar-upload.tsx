import { Endpoints } from '@/core/constants';
import { HttpService } from '@/core/services';
import { Camera, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function AvatarUpload({
    initialAvatarUrl,
    displayName,
    onUploadSuccess,
}: {
    initialAvatarUrl?: string;
    displayName?: string;
    onUploadSuccess?: (fileUrl: string) => void;
}) {
    const [uploading, setUploading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl || '');

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            alert('File size must be less than 2MB.');
            return;
        }

        setUploading(true);

        try {
            const res = await HttpService.request(Endpoints.UPLOAD, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fileType: file.type }),
            });

            const { uploadUrl, fileUrl } = res?.data;

            if (!uploadUrl || !fileUrl) {
                toast.error('Upload URL or file URL not provided');
                return;
            }

            const uploadRes = await fetch(uploadUrl, {
                method: 'PUT',
                body: file,
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (!uploadRes.ok) {
                toast.error('AWS upload failed');
                return;
            }

            setAvatarUrl(fileUrl);
            onUploadSuccess?.(fileUrl);
        } catch {
            toast.error('Failed to upload avatar. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="relative w-24 h-24 rounded-full bg-zinc-900 border-2 border-dashed border-zinc-700 flex items-center justify-center cursor-pointer hover:border-zinc-500 hover:bg-zinc-800 transition group overflow-hidden">
            <input
                type="file"
                className="z-10 opacity-0 absolute top-0 left-0 right-0 bottom-0 rounded-full cursor-pointer"
                onChange={handleFileChange}
            />
            {uploading ? (
                <Loader2 className="animate-spin text-zinc-600" />
            ) : avatarUrl ? (
                <Image
                    src={avatarUrl}
                    alt="Avatar"
                    width={96}
                    height={96}
                    className="w-24 h-24 object-cover"
                />
            ) : displayName ? (
                <span className="text-2xl font-bold text-zinc-300">
                    {displayName.charAt(0).toLocaleUpperCase()}
                </span>
            ) : (
                <Camera className="text-zinc-600 group-hover:text-zinc-400" />
            )}

            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition text-xs font-medium">
                {uploading ? 'Uploading...' : 'Change'}
            </div>
        </div>
    );
}
