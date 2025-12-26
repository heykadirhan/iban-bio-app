'use client';
import { useState, useEffect } from 'react';

export function TypingEffect() {
    const [typedName, setTypedName] = useState('');
    const targetName = 'joe-doe';

    useEffect(() => {
        let i = 0;
        let interval: ReturnType<typeof setInterval>;

        const startTyping = () => {
            interval = setInterval(() => {
                i++;
                setTypedName(targetName.slice(0, i));

                if (i === targetName.length) {
                    clearInterval(interval);

                    setTimeout(() => {
                        i = 0;
                        setTypedName('');
                        startTyping();
                    }, 2000);
                }
            }, 300);
        };

        startTyping();

        return () => clearInterval(interval);
    }, [targetName]);

    return (
        <span className="text-white font-mono font-bold text-lg relative">
            {typedName}
            <span className="absolute -right-1 top-0 h-full w-0.5 bg-indigo-500 animate-blink"></span>
        </span>
    );
}
