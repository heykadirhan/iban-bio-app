import { Globe, LinkIcon, Lock } from 'lucide-react';

export const PROFILE_VISIBILITY_OPTIONS = [
    {
        id: 'public',
        label: 'Public & Phone',
        desc: 'Everyone who knows your username, link, or phone number',
        icon: Globe,
        color: 'bg-green-500/10 text-green-500 border-green-500/20',
    },
    {
        id: 'link_only',
        label: 'Expirable Links',
        desc: 'Generate private & secure link that expires',
        icon: LinkIcon,
        color: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    },
    {
        id: 'private',
        label: 'Private',
        desc: 'Only you can access your profile',
        icon: Lock,
        color: 'bg-red-500/10 text-red-500 border-red-500/20',
    },
];
