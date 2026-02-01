'use client';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Routes } from '@/core/constants';
import { createRoute } from '@/core/utils';
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const InputPhone = dynamic(() => import('@/components/input-phone'), {
    ssr: false,
    loading: () => (
        <div className="h-12 w-full rounded-xl bg-[#111] border border-zinc-800 animate-pulse" />
    ),
});

export function PhoneSearch() {
    const [phoneSearch, setPhoneSearch] = useState('');
    const [phoneSearchCountry, setPhoneSearchCountry] = useState('');

    return (
        <InputPhone
            onPhoneChange={(val) => setPhoneSearch(val)}
            onCountryChange={(val) => setPhoneSearchCountry(val)}
            value={phoneSearch}
            suffix={
                <Link
                    href={createRoute({
                        path: Routes.SEARCH,
                        searchParams: {
                            phone: phoneSearch.replaceAll(' ', ''),
                            country: phoneSearchCountry,
                        },
                    })}>
                    <Button
                        type="submit"
                        size="icon"
                        variant="primary">
                        <SearchIcon size={16} />
                    </Button>
                </Link>
            }
        />
    );
}
