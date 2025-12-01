import { calculateLiveStreak } from '../utils/streakCalculator.js';

export function habitDTO(habit) {
    if (!habit) {
        return null;
    }

    const verifiedStreak = calculateLiveStreak(
        habit.current_streak,
        habit.last_entry_date,
        habit.frequency,
    );

    return {
        id: habit.id,
        name: habit.name,
        color: habit.color,
        frequency: habit.frequency,
        currentStreak: verifiedStreak,
        maxStreak: habit.max_streak,
        completedDates: habit.weekly_dates || [],
    };
}
