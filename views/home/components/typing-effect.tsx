'use client';
import { useState, useEffect, useCallback } from 'react';

export function TypingEffect() {
    const [typedName, setTypedName] = useState('');
    const targetName = 'joe-doe';

    const startTyping = useCallback(() => {
        let i = 0;
        const interval = setInterval(() => {
            i++;
            setTypedName(targetName.slice(0, i));

            if (i === targetName.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setTypedName('');
                    startTyping();
                }, 2000);
            }
        }, 150); // Faster typing for better UX

        return interval;
    }, [targetName]);

    useEffect(() => {
        const interval = startTyping();
        return () => clearInterval(interval);
    }, [startTyping]);

    return (
        <span className="text-white font-mono font-bold text-lg relative">
            {typedName}
            <span className="absolute -right-1 top-0 h-full w-0.5 bg-indigo-500 animate-blink"></span>
        </span>
    );
}
