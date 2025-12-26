'use client';

import COUNTRIES from '@/assets/data/countries.json';
import { useState, useEffect, useRef, ReactNode, useMemo } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';
import { withMask } from 'use-mask-input';

export default function InputPhone({
    value,
    onPhoneChange,
    onCountryChange,
    defaultCountry = 'TR',
    className = '',
    suffix,
}: {
    value: string;
    onPhoneChange(phone: string): void;
    onCountryChange(country: string): void;
    defaultCountry?: string;
    className?: string;
    suffix?: ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');

    const [selectedCountry, setSelectedCountry] = useState(
        COUNTRIES.find((c) => c.code === defaultCountry) || COUNTRIES[0],
    );

    const inputMaskRef = useMemo(() => {
        return withMask(selectedCountry.mask);
    }, [selectedCountry.mask]);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        onPhoneChange('');
        onCountryChange(selectedCountry.code);
    }, [selectedCountry]);

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSelect = (country: any) => {
        setSelectedCountry(country);
        setIsOpen(false);
        setSearch('');
    };

    const filteredCountries = COUNTRIES.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.dial.includes(search) ||
            c.code.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div
            className={`relative group ${className}`}
            ref={dropdownRef}>
            <div className="flex items-center bg-[#111] border border-zinc-800 rounded-xl pr-2 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-blue-900/20 transition-all duration-200">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 pl-3 pr-2 py-3.5 border-r border-zinc-800 hover:bg-zinc-900 rounded-l-xl transition-colors shrink-0 outline-none">
                    <span className="text-xl leading-none">
                        {selectedCountry?.flag}
                    </span>
                    <span className="text-zinc-300 font-medium text-sm">
                        {selectedCountry?.dial}
                    </span>
                    <ChevronDown
                        size={14}
                        className={`text-zinc-500 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                    />
                </button>

                <input
                    ref={inputMaskRef}
                    type="text"
                    inputMode="numeric"
                    value={value}
                    onChange={(event) =>
                        onPhoneChange(event.target.value.replace(/\D/g, ''))
                    }
                    placeholder="Enter phone number"
                    className="w-full bg-transparent px-4 py-3.5 text-white outline-none placeholder:text-zinc-600 font-mono text-sm rounded-r-xl"
                />

                {suffix}
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-full sm:w-80 bg-[#1a1a1a] border border-zinc-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-60">
                    <div className="p-2 border-b border-zinc-700 bg-[#1a1a1a] sticky top-0 z-10">
                        <div className="relative">
                            <Search
                                size={14}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                            />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search country..."
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:border-primary outline-none placeholder:text-zinc-600"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent p-1 flex-1">
                        {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                                <button
                                    key={country.code}
                                    onClick={() => handleSelect(country)}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors group ${
                                        selectedCountry?.code === country.code
                                            ? 'bg-blue-600/10 text-primary/60'
                                            : 'hover:bg-zinc-800 text-zinc-300'
                                    }`}>
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <span className="text-lg flex-shrink-0">
                                            {country.flag}
                                        </span>
                                        <span className="text-sm font-medium truncate">
                                            {country.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <span className="text-xs text-zinc-500 font-mono group-hover:text-zinc-400">
                                            {country.dial}
                                        </span>
                                        {selectedCountry?.code ===
                                            country.code && <Check size={14} />}
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="p-4 text-center text-zinc-500 text-sm">
                                No result
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
