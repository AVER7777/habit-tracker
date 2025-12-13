import { useState } from 'react';
import EditColor from './settings/EditColor.jsx';
import EditFrequency from './settings/EditFrequency.jsx';
import EditName from './settings/EditName.jsx';

function CreateHabitForm({ onCreate, onClose }) {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#64748b');
    const [frequency, setFrequency] = useState(7);

    const handleSubmit = (e) => {
        e.preventDefault();

        onCreate({
            name,
            color: color.toLowerCase(),
            frequency: parseInt(frequency),
        });

        setName('');
        setColor('#64748b');
        setFrequency(7);
    };

    return (
        <form onSubmit={handleSubmit}>
            <EditName name={name} onChange={setName} />
            <EditColor color={color} onChange={setColor} />
            <EditFrequency frequency={frequency} onChange={setFrequency} />

            <button type="submit" className="bg-gray-500">
                Create
            </button>
        </form>
    );
}

export default CreateHabitForm;
