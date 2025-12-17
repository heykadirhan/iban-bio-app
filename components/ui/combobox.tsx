import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { IOptionItem } from '@/core/interfaces';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from './command';
import { cn } from '@/lib/utils';

export function Combobox({
    value,
    items,
    inputPlaceholder,
    searchPlaceholder,
    emptyText,
    onChange,
    onSearch,
}: {
    value?: string;
    items: IOptionItem[];
    inputPlaceholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    onChange?(value: string): void;
    onSearch?(query: string): void;
}) {
    const [open, setOpen] = useState(false);

    return (
        <Popover
            open={open}
            onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    role="combobox"
                    aria-expanded={open}
                    size="lg"
                    className={cn(
                        'justify-between bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 !px-6 text-sm font-normal',
                        value ? 'text-white' : 'text-zinc-600',
                    )}>
                    {value
                        ? items.find((item) => item.value === value)?.label
                        : inputPlaceholder || 'Select an option'}
                    <ChevronsUpDown size={16} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput
                        placeholder={searchPlaceholder || 'Search...'}
                        onValueChange={onSearch}
                    />
                    <CommandList>
                        <CommandEmpty>
                            {emptyText || 'No item found'}
                        </CommandEmpty>
                        {items.length > 0 && (
                            <CommandGroup>
                                {items.map((item) => (
                                    <CommandItem
                                        key={item.value}
                                        value={item.value}
                                        onSelect={(currentValue: string) => {
                                            onChange?.(
                                                currentValue === value
                                                    ? ''
                                                    : currentValue,
                                            );
                                            setOpen(false);
                                        }}>
                                        {item.label}
                                        <Check
                                            className={cn(
                                                'ml-auto',
                                                value === item.value
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
