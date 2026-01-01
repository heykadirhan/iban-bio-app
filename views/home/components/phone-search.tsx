'use client';
import InputPhone from '@/components/input-phone';
import { Button } from '@/components/ui/button';
import { Routes } from '@/core/constants';
import { createRoute } from '@/core/utils';
import { Link, Search } from 'lucide-react';
import { useState } from 'react';

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
                        <Search size={16} />
                    </Button>
                </Link>
            }
        />
    );
}
