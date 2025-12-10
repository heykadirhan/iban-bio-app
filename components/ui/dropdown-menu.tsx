'use client';

import React, {
    useState,
    useRef,
    useEffect,
    createContext,
    useContext,
} from 'react';

// Context: Açık/Kapalı durumunu yönetmek için
const DropdownContext = createContext();

export function DropdownMenu({ children }) {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef(null);
    const contentRef = useRef(null);

    // Dışarı tıklandığında kapatma
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                contentRef.current &&
                !contentRef.current.contains(event.target) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <DropdownContext.Provider
            value={{ open, setOpen, triggerRef, contentRef }}>
            <div className="relative inline-block text-left">{children}</div>
        </DropdownContext.Provider>
    );
}

export function DropdownMenuTrigger({ children, asChild }) {
    const { open, setOpen, triggerRef } = useContext(DropdownContext);

    return (
        <div
            ref={triggerRef}
            onClick={() => setOpen(!open)}
            className="cursor-pointer">
            {children}
        </div>
    );
}

export function DropdownMenuContent({ children, align = 'end' }) {
    const { open, contentRef } = useContext(DropdownContext);

    if (!open) return null;

    const alignmentClass = align === 'end' ? 'right-0' : 'left-0';

    return (
        <div
            ref={contentRef}
            className={`absolute ${alignmentClass} z-50 mt-2 min-w-[12rem] overflow-hidden rounded-md border border-zinc-800 bg-[#1a1a1a] p-1 text-zinc-300 shadow-lg animate-in fade-in zoom-in-95 duration-200`}>
            {children}
        </div>
    );
}

export function DropdownMenuItem({
    children,
    onClick,
    className = '',
    classNameIntent = 'default',
}) {
    const { setOpen } = useContext(DropdownContext);

    // Intent: 'danger' ise kırmızı, değilse normal hover
    const hoverClass =
        classNameIntent === 'danger'
            ? 'focus:bg-red-500/10 focus:text-red-500 hover:bg-red-500/10 hover:text-red-500'
            : 'focus:bg-zinc-800 focus:text-white hover:bg-zinc-800 hover:text-white';

    return (
        <div
            onClick={(e) => {
                if (onClick) onClick(e);
                setOpen(false);
            }}
            className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors ${hoverClass} ${className}`}>
            {children}
        </div>
    );
}

export function DropdownMenuLabel({ children }) {
    return (
        <div className="px-2 py-1.5 text-sm font-semibold text-white">
            {children}
        </div>
    );
}

export function DropdownMenuSeparator() {
    return <div className="-mx-1 my-1 h-px bg-zinc-800" />;
}

export function DropdownMenuShortcut({ children }) {
    return (
        <span className="ml-auto text-xs tracking-widest text-zinc-500">
            {children}
        </span>
    );
}
