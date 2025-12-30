'use client';

import { PropsWithChildren, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Routes } from '@/core/constants';
import {
    ArrowLeft,
    LogOut,
    Search,
    Settings,
    Sparkles,
    User,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { isoToCode } from '@/core/utils';

export function DashboardLayout({
    children,
    title,
    backHref,
}: PropsWithChildren<{ title?: string | ReactNode; backHref?: string }>) {
    const session = useSession();
    return (
        <div className="min-h-screen bg-background text-white relative">
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[20%] w-[400px] h-[400px] bg-purple-900/20 rounded-full blur-[100px]" />
                <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] bg-blue-900/10 rounded-full blur-[80px]" />
            </div>

            <div className="py-6 max-w-lg mx-auto relative z-10">
                <header>
                    <div className="container">
                        <div className="flex justify-between items-center h-10">
                            <div className="flex items-center gap-2">
                                {backHref && (
                                    <Link href={backHref}>
                                        <Button
                                            variant="ghost"
                                            size="icon-lg">
                                            <ArrowLeft className="size-5" />
                                        </Button>
                                    </Link>
                                )}
                                {title ? (
                                    <h1 className="text-2xl font-bold flex items-center gap-2.5">
                                        <Link href={Routes.ROOT}>{title}</Link>
                                    </h1>
                                ) : (
                                    <Link
                                        href={Routes.ROOT}
                                        className="flex items-center gap-2 cursor-pointer">
                                        <Image
                                            src="/img/logo.svg"
                                            alt="Logo"
                                            width={120}
                                            height={40}
                                        />
                                    </Link>
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                <Link href={Routes.SEARCH}>
                                    <Button
                                        size="icon-lg"
                                        variant="secondary"
                                        className="border border-zinc-700 rounded-full">
                                        <Search size={18} />
                                    </Button>
                                </Link>
                                {session.status === 'unauthenticated' ? (
                                    <Link href={Routes.GET_STARTED}>
                                        <Button
                                            size="icon-lg"
                                            variant="secondary"
                                            className="border border-zinc-700 rounded-full">
                                            <User size={18} />
                                        </Button>
                                    </Link>
                                ) : (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <button className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                                                {session.data?.user
                                                    .avatarUrl ? (
                                                    <Image
                                                        src={
                                                            session.data?.user
                                                                .avatarUrl
                                                        }
                                                        alt="Avatar"
                                                        width={128}
                                                        height={128}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="font-bold text-sm">
                                                        {session.data?.user.displayName
                                                            ?.charAt(0)
                                                            .toLocaleUpperCase()}
                                                    </span>
                                                )}
                                            </button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>
                                                <div className="flex flex-col space-y-1">
                                                    <p className="text-sm font-medium leading-none">
                                                        {
                                                            session.data?.user
                                                                .displayName
                                                        }
                                                    </p>
                                                    <p className="text-xs leading-none text-zinc-500 font-normal">
                                                        {session.data?.user
                                                            .phone ||
                                                            session.data?.user
                                                                .email}
                                                    </p>
                                                </div>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <Link href={Routes.DASHBOARD}>
                                                <DropdownMenuItem>
                                                    <User className="mr-2 h-4 w-4" />
                                                    <span>Dashboard</span>
                                                </DropdownMenuItem>
                                            </Link>
                                            <Link href={Routes.SETTINGS}>
                                                <DropdownMenuItem>
                                                    <Settings className="mr-2 h-4 w-4" />
                                                    <span>Settings</span>
                                                </DropdownMenuItem>
                                            </Link>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={() => signOut()}
                                                className="text-red-500"
                                                classNameIntent="danger">
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Logout</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {children}

                <footer>
                    <div className="container">
                        <div className="mt-12 text-center opacity-50 hover:opacity-100 transition-opacity duration-500">
                            <Link
                                href="/"
                                className="text-xs font-medium text-zinc-500 tracking-widest uppercase flex items-center justify-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500"></span>
                                Powered by iban.bio
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500"></span>
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
