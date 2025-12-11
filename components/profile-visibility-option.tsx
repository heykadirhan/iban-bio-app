export function ProfileVisibilityOption({
    option,
    value,
}: {
    option: {
        id: string;
        label: string;
        desc: string;
        icon: React.ComponentType<{ size: number }>;
        color: string;
    };
    value: string;
}) {
    return (
        <div
            className={`
                            relative h-full flex flex-col items-center justify-center gap-2 py-3 px-2 sm:p-3 rounded-xl border transition-all duration-200
                            ${
                                value === option.id
                                    ? `${option.color} bg-opacity-10 border-opacity-50 shadow-sm ring-1 ring-inset ring-white/10`
                                    : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300'
                            }
                          `}>
            <option.icon size={20} />
            <div className="text-center">
                <p className="text-xs font-bold">{option.label}</p>
                <p className="text-[10px] opacity-70 mt-0.5">{option.desc}</p>
            </div>

            {value === option.id && (
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_5px_currentColor]"></div>
            )}
        </div>
    );
}
