import HabitCard from './HabitCard.jsx';

function HabitGrid({ habits }) {
    if (!habits || habits.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500">
                <p>No habit found.</p>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-2 gap-4 pb32">
            {habits.map((habit) => (
                <HabitCard key={habit.id} habit={habit} />
            ))}
        </div>
    );
}

export default HabitGrid;
