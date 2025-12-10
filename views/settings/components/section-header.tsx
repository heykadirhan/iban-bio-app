export const SectionHeader = ({
    title,
    icon: Icon,
}: {
    title: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
}) => (
    <div className="flex items-center gap-3 border-b border-zinc-800 pb-3 mb-6">
        <Icon
            size={20}
            className="text-primary"
        />
        <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
);
