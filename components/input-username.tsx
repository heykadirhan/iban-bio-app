import { cn } from '@/lib/utils';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from './ui/input-group';
import { Check, Loader2, XIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { HttpService } from '@/core/services';
import { Endpoints } from '@/core/constants';

export function InputUsername({
    field,
    onChangeAvailablity,
}: {
    field: React.ComponentProps<typeof InputGroupInput>;
    onChangeAvailablity(isAvailable: boolean): void;
}) {
    const [usernameAvailability, setUsernameAvailability] = useState<
        'idle' | 'loading' | 'available' | 'in-use'
    >('idle');

    const checkUsernameAvailability = async (username: string) => {
        if (!username) {
            setUsernameAvailability('idle');
            return;
        }

        setUsernameAvailability('loading');

        try {
            await HttpService.request(Endpoints.AUTH_CHECK_USERNAME, {
                method: 'POST',
                body: JSON.stringify({ username }),
                noToastError: true,
            });

            setUsernameAvailability('available');
            onChangeAvailablity(true);
        } catch {
            setUsernameAvailability('in-use');
            onChangeAvailablity(false);
        }
    };

    const debouncedCheckUsernameAvailability = useCallback(
        // eslint-disable-next-line react-hooks/exhaustive-deps
        debounce(checkUsernameAvailability, 300),
        [],
    );

    useEffect(() => {
        debouncedCheckUsernameAvailability(field.value as string);
    }, [field.value]);

    return (
        <InputGroup>
            <InputGroupInput
                {...field}
                placeholder="your-username"
            />
            <InputGroupAddon>
                <InputGroupText>iban.bio/</InputGroupText>
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
                {usernameAvailability !== 'idle' && (
                    <div
                        className={cn(
                            'flex size-5 items-center justify-center rounded-full',
                            usernameAvailability === 'loading'
                                ? 'bg-transparent'
                                : usernameAvailability === 'available'
                                ? 'bg-green-500/20 text-green-500'
                                : 'bg-red-500/20 text-red-500',
                        )}>
                        {usernameAvailability === 'available' ? (
                            <Check className="size-3" />
                        ) : usernameAvailability === 'in-use' ? (
                            <XIcon className="size-3" />
                        ) : (
                            <Loader2 className="animate-spin" />
                        )}
                    </div>
                )}
            </InputGroupAddon>
        </InputGroup>
    );
}
