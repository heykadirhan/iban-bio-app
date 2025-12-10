'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Routes } from '@/core/constants';
import { CreditCard, LogOut, Settings, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

export function DashboardLayout({
    children,
    title,
}: PropsWithChildren<{ title?: string }>) {
    const session = useSession();
    const router = useRouter();

    return (
        <div className="min-h-screen bg-background text-white relative">
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[20%] w-[400px] h-[400px] bg-purple-900/20 rounded-full blur-[100px]" />
                <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] bg-blue-900/10 rounded-full blur-[80px]" />
            </div>

            <div className="py-6 pt-8 max-w-md mx-auto relative z-10">
                <header>
                    <div className="container">
                        <div className="flex justify-between items-center">
                            {title ? (
                                <h1 className="text-2xl font-bold">{title}</h1>
                            ) : (
                                <br />
                            )}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                                        {session.data?.user.avatarUrl ? (
                                            <Image
                                                src={
                                                    session.data?.user.avatarUrl
                                                }
                                                alt="Avatar"
                                                width={40}
                                                height={40}
                                                className="w-10 h-10 rounded-full"
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
                                                {session.data?.user.displayName}
                                            </p>
                                            <p className="text-xs leading-none text-zinc-500 font-normal">
                                                +90
                                                {session.data?.user.phoneNumber}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() =>
                                            router.push(Routes.DASHBOARD)
                                        }>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Dashboard</span>
                                        <DropdownMenuShortcut>
                                            ⇧⌘P
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => signOut()}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Logout</span>
                                        <DropdownMenuShortcut>
                                            ⇧⌘Q
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
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
