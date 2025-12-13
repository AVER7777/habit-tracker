import {
    deleteHabit,
    getHabit,
    updateHabitColor,
    updateHabitFrequency,
    updateHabitName,
} from '../../api/habits.js';
import EditName from '../../components/habits/settings/EditName.jsx';
import EditColor from '../../components/habits/settings/EditColor.jsx';
import EditFrequency from '../../components/habits/settings/EditFrequency.jsx';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function HabitSettingsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [habit, setHabit] = useState(null);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [frequency, setFrequency] = useState(7);

    useEffect(() => {
        getHabit(id)
            .then((data) => {
                setHabit(data);
                setName(data.name);
                setColor(data.color);
                setFrequency(data.frequency);
                setLoading(false);
            })
            .catch((error) => {
                console.log('Loading error', error);
                navigate('/');
            });
    }, [id, navigate]);

    const handleSave = async () => {
        try {
            const promises = [];

            if (name !== habit.name) {
                promises.push(updateHabitName(id, name));
            }

            if (color !== habit.color) {
                promises.push(updateHabitColor(id, color));
            }

            if (frequency !== habit.frequency) {
                promises.push(updateHabitFrequency(id, frequency));
            }

            await Promise.all(promises);
            navigate('/');
        } catch (error) {
            console.error('Error while saving habit settings', error);
            alert('Error while saving habit settings');
        }
    };

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this habit?')) {
            try {
                await deleteHabit(id);
                navigate('/');
            } catch (error) {
                console.error('Error while deleting habit', error);
                alert('Error while deleting habit');
            }
        }
    };

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="p-4 min-h-screen bg-black text-white">
            <div className="flex justify-between items-center mb-8">
                <button onClick={() => navigate('/')} className="text-gray-400">
                    Cancel
                </button>
                <h1 className="text-lg font-bold">Edit</h1>
                <button onClick={handleSave} className="bg-blue-500 font-bold">
                    Save
                </button>
            </div>

            <div className="space-y-6">
                <EditName name={name} onChange={setName} />
                <EditColor color={color} onChange={setColor} />
                <EditFrequency frequency={frequency} onChange={setFrequency} />
            </div>

            <div className="mt-12 pt-6 border-t border-gray-800">
                <button
                    onClick={handleDelete}
                    className="w-full py-3 bg-red-900/20 text-red-500 rounded-lg font-medium border border-red-900/50"
                >
                    Delete habit
                </button>
            </div>
        </div>
    );
}

export default HabitSettingsPage;
