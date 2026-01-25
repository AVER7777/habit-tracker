import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { addEntry, deleteEntry } from '../../api/entries.js';
import { getHabit } from '../../api/habits.js';
import useLongPress from '../../hooks/useLongPress.jsx';
import { getCurrentWeekDates, getLocalDate } from '../../utils/date.js';
import FlameIcon from '../icons/FlameIcon';
import ProgressCircleIcon from '../icons/ProgressCircleIcon.jsx';

function HabitCard({ habit }) {
    const navigate = useNavigate();
    const today = getLocalDate();

    const [checked, setChecked] = useState(habit.completedDates.includes(today));
    const [currentStreak, setCurrentStreak] = useState(habit.currentStreak);

    const [completedDates, setCompletedDates] = useState(habit.completedDates || []);

    const handleLongPress = () => {
        navigate(`/habits/${habit.id}/settings`);
    };

    // animation
    const [isAnimating, setIsAnimating] = useState(false);

    const triggerFeedback = () => {
        if (navigator.vibrate) navigator.vibrate(15);

        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 200);
    };

    const handleClick = async () => {
        triggerFeedback();
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

    let label;

    if (habit.frequency === 7) {
        if (habit.currentStreak === 1) {
            label = 'DAY';
        } else {
            label = 'DAYS';
        }
    } else {
        if (habit.currentStreak <= 14) {
            label = 'WEEK';
        } else {
            label = 'WEEKS';
        }
    }

    return (
        <div
            className={`border p-4 border-ios-quaternary aspect-square rounded-3xl grid grid-rows-[auto_1fr_auto]
                ${!checked && 'bg-ios-bg'}
                ${isAnimating ? 'animate-bump' : ''}
            `}
            style={{
                color: checked ? 'white' : undefined,
                background: checked
                    ? `linear-gradient(to bottom, var(--ios-${habit.color}-dark), var(--habit-darker))`
                    : undefined,
                '--habit-darker': `color-mix(in srgb, var(--ios-${habit.color}-dark), black 60%)`,
            }}
            {...longPressEvent}
        >
            <div className="flex flex-row justify-between">
                <div className="ml-1">
                    <div className="flex flex-col items-start justify-between w-full">
                        <div className="flex items-center">
                            {/*streak*/}
                            <span className="pr-1 text-[32px] font-bold leading-none">
                                {currentStreak}
                            </span>

                            {/*flame*/}
                            <FlameIcon
                                className="w-auto h-5 translate-y-1"
                                style={{
                                    color: `var(--ios-${habit.color})`,
                                }}
                            />
                        </div>

                        <span className="text-[11px] font-medium justify-left text-ios-secondary">
                            {label}
                        </span>
                    </div>
                </div>

                {/* progress circle */}
                <div className="flex items-center justify-center">
                    <ProgressCircleIcon
                        current={completedDates.length}
                        total={habit.frequency}
                        size={46}
                        color={`var(--ios-${habit.color}-light)`}
                        checked={checked}
                    />
                </div>
            </div>

            {/*habit name*/}
            <div className="flex items-center w-full overflow-hidden">
                <span className="text-lg shrink-0 mr-1">😊</span>
                <h3 className="text-[20px] tracking-tight leading-4 font-bold line-clamp-2 text-left break-words">
                    {habit.name}
                </h3>
            </div>

            {/*week days*/}
            <div className="flex justify-between items-center border-white mb-1">
                {weekDays.map((day, index) => {
                    const isDayCompleted = completedDates.includes(day.dateString);

                    return (
                        <div key={index} className="flex flex-col items-center gap-1">
                            <div
                                className="w-4 h-4 rounded-[3px] flex items-center justify-center text-[9px] font-bold transition-all"
                                style={{
                                    color: isDayCompleted
                                        ? 'white'
                                        : `var(--ios-${habit.color}-light)`,
                                    backgroundColor: isDayCompleted
                                        ? `var(--ios-${habit.color}-light)`
                                        : `var(--ios-${habit.color}-dark)`,
                                }}
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
