import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { addEntry, deleteEntry } from '../../api/entries.js';
import { getHabit } from '../../api/habits.js';
import useLongPress from '../../hooks/useLongPress.jsx';
import { getCurrentWeekDates, getLocalDate } from '../../utils/date.js';

function HabitCard({ habit }) {
    const navigate = useNavigate();
    const today = getLocalDate();

    const [checked, setChecked] = useState(habit.completedDates.includes(today));
    const [currentStreak, setCurrentStreak] = useState(habit.currentStreak);

    const [completedDates, setCompletedDates] = useState(habit.completedDates || []);

    const handleLongPress = () => {
        navigate(`/habits/${habit.id}/settings`);
    };

    const handleClick = async () => {
        try {
            setChecked(!checked);

            if (checked) {
                setCompletedDates((prev) => prev.filter((d) => d !== today));

                await deleteEntry(habit.id, today);

                const updatedHabit = await getHabit(habit.id);
                setCurrentStreak(updatedHabit.currentStreak);
                setCompletedDates(updatedHabit.completedDates);
            } else {
                setCompletedDates((prev) => [...prev, today]);

                const response = await addEntry(habit.id, today);

                if (response.newStreak !== undefined) {
                    setCurrentStreak(response.newStreak);
                } else {
                    const updatedHabit = await getHabit(habit.id);
                    setCurrentStreak(updatedHabit.currentStreak);
                }
                const updatedHabit = await getHabit(habit.id);
                setCompletedDates(updatedHabit.completedDates);
            }
        } catch (error) {
            console.error('Error while checking habit', error);
            setChecked(checked);
            setCompletedDates(habit.completedDates);
        }
    };

    const longPressEvent = useLongPress(handleLongPress, handleClick, {
        delay: 500,
    });

    const weekDays = getCurrentWeekDates(1);

    return (
        <div
            className={`mb-4 p-4 rounded-3xl relative overflow-hidden transition-all flex flex-col justify-between min-h-[150px] cursor-pointer select-none`}
            style={{
                backgroundColor: habit.color,
                color: 'white',
            }}
            {...longPressEvent}
        >
            <div className="flex justify-between items-start">
                <div className="flex flex-col">
                    <div className="flex items-center gap-1 opacity-90 mb-1">
                        <span className="text-xl">🔥</span>
                        <span className="font-bold text-lg">{currentStreak}</span>
                        <span className="text-xs uppercase opacity-75 pt-1">Jours</span>
                    </div>
                    <h3 className="text-2xl font-bold leading-tight">{habit.name}</h3>
                </div>

                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-white/30 transition-colors ${checked ? 'bg-white text-black' : 'bg-transparent'}`}
                >
                    {checked && <span className="font-bold">✓</span>}
                </div>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/20">
                {weekDays.map((day, index) => {
                    const isDayCompleted = completedDates.includes(day.dateString);

                    return (
                        <div key={index} className="flex flex-col items-center gap-1">
                            <div
                                className={`
                                    w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold transition-all
                                    ${
                                        isDayCompleted
                                            ? 'bg-white text-black opacity-100'
                                            : 'bg-black/20 text-white opacity-60'
                                    }
                                    ${day.isToday ? 'ring-2 ring-white ring-offset-1 ring-offset-transparent' : ''}
                                `}
                            >
                                {day.letter}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default HabitCard;
