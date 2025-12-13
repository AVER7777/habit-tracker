function EditColor({ color, onChange }) {
    const colors = [
        { tailwind: 'bg-slate-500', hex: '#64748b' },
        { tailwind: 'bg-red-500', hex: '#ef4444' },
        { tailwind: 'bg-orange-500', hex: '#f97316' },
        { tailwind: 'bg-amber-500', hex: '#f59e0b' },
        { tailwind: 'bg-green-500', hex: '#22c55e' },
        { tailwind: 'bg-emerald-500', hex: '#10b981' },
        { tailwind: 'bg-teal-500', hex: '#14b8a6' },
        { tailwind: 'bg-cyan-500', hex: '#06b6d4' },
        { tailwind: 'bg-blue-500', hex: '#3b82f6' },
        { tailwind: 'bg-indigo-500', hex: '#6366f1' },
        { tailwind: 'bg-violet-500', hex: '#8b5cf6' },
        { tailwind: 'bg-purple-500', hex: '#a855f7' },
        { tailwind: 'bg-fuchsia-500', hex: '#d946ef' },
        { tailwind: 'bg-pink-500', hex: '#ec4899' },
        { tailwind: 'bg-rose-500', hex: '#f43f5e' },
    ];

    return (
        <div className="mb-4">
            <label>Color</label>
            <div className="flex flex-wrap gap-3">
                {colors.map((c) => (
                    <button
                        key={c.hex}
                        type="button"
                        onClick={() => onChange(c.hex)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${c.tailwind} ${
                            color === c.hex
                                ? 'border-black ring-2 ring-offset-1 ring-black'
                                : 'border-transparent'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default EditColor;
