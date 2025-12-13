function EditFrequency({ frequency, onChange }) {
    const days = [1, 2, 3, 4, 5, 6, 7];
    return (
        <div className="mb-4">
            <label htmlFor="frequency" className="block mb-2 text-sm font-medium text-gray-900">
                Frequency
            </label>
            <div className="flex flex-wrap gap-3">
                {days.map((i) => (
                    <button
                        key={i}
                        type="button"
                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110" ${
                            frequency === i
                                ? 'border-black ring-2 ring-offset-1 ring-black'
                                : 'border-transparent'
                        }`}
                        onClick={() => onChange(i)}
                    >
                        {i}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default EditFrequency;
