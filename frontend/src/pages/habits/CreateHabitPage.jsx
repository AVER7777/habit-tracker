import { useNavigate } from 'react-router-dom';
import { createHabit } from '../../api/habits.js';
import CreateHabitForm from '../../components/habits/CreateHabitForm.jsx';

function CreateHabitPage() {
    const navigate = useNavigate();

    const handleCreate = async (habitData) => {
        try {
            await createHabit(habitData);
            navigate('/');
        } catch (error) {
            console.error('Creation error: ', error);
            alert('Creation failed');
        }
    };

    return (
        <div className="p-4 flex flex-col h-screen">
            <div className="flex items-center mb-6">
                <button onClick={() => navigate('/')} className="mr-4 text-2xl" aria-label="Back">
                    ←
                </button>
                <h1 className="text-xl front bold">New Habit</h1>
            </div>
            <CreateHabitForm onCreate={handleCreate} onClose={() => navigate('/')} />
        </div>
    );
}

export default CreateHabitPage;
