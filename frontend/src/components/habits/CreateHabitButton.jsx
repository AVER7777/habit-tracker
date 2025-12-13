import { useNavigate } from 'react-router-dom';

function CreateHabitButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/habits/create');
    };

    return (
        <button
            onClick={handleClick}
            className="float-right w-10 h-10 bg-blue-600 rounded-full text-white text-2xl flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
            aria-label="Add habit"
        >
            +
        </button>
    );
}

export default CreateHabitButton;
