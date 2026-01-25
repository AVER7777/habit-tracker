function EditColor({ color, onChange }) {
    const colors = [
        'red',
        'orange',
        'yellow',
        'green',
        'mint',
        'cyan',
        'blue',
        'indigo',
        'purple',
        'pink',
        'brown',
    ];
    return (
        <div className="mb-4">
            <label>Color</label>
            <div className="flex flex-wrap gap-3">
                {colors.map((c) => (
                    <button
                        key={c}
                        type="button"
                        onClick={() => onChange(c)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                            color === c
                                ? 'border-black ring-2 ring-offset-1 ring-black'
                                : 'border-transparent'
                        }`}
                        style={{ backgroundColor: `var(--ios-${c})` }}
                    />
                ))}
            </div>
        </div>
    );
}

export default EditColor;
