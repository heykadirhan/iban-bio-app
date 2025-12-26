import { useEffect, useRef, useState } from 'react';
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
    disabled,
    onChange,
    onSearch,
}: {
    value?: string;
    items: IOptionItem[];
    inputPlaceholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    disabled?: boolean;
    onChange?(value: string): void;
    onSearch?(query: string): void;
}) {
    const [width, setWidth] = useState<string>();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const button = document.querySelector(
                'button[role="combobox"]',
            ) as HTMLElement;
            if (button) {
                setWidth(`${button.offsetWidth}px`);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [open]);

    return (
        <Popover
            open={open}
            onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    role="combobox"
                    aria-expanded={open}
                    size="lg"
                    className={cn(
                        'h-[52px] justify-between bg-zinc-900 border border-zinc-800 hover:bg-zinc-900/80 !px-6 text-sm font-normal',
                        value ? 'text-white' : 'text-zinc-600',
                    )}>
                    {value
                        ? items.find((item) => item.value === value)?.label
                        : inputPlaceholder || 'Select an option'}
                    <ChevronsUpDown size={16} />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="relative w-full p-0"
                sticky="always"
                side="bottom">
                <Command style={{ width }}>
                    <CommandInput
                        placeholder={searchPlaceholder || 'Search...'}
                        onValueChange={onSearch}
                    />
                    <CommandList>
                        <CommandEmpty>
                            {emptyText || 'No results found.'}
                        </CommandEmpty>
                        {items.length > 0 && (
                            <CommandGroup className="max-h-60 overflow-y-auto">
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
