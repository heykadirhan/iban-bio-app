'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const ActivityLogger = () => {
    const pathname = usePathname();

    useEffect(() => {
        const controller = new AbortController();

        fetch('/api/activity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ path: pathname }),
            keepalive: true,
            signal: controller.signal,
        }).catch(() => {});

        return () => controller.abort();
    }, [pathname]);

    return null;
};
