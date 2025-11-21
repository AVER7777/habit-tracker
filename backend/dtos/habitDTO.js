export function habitDTO(habit) {
    if (!habit) {
        return null;
    }

    return {
        id: habit.id,
        name: habit.name,
        color: habit.color,
        frequency: habit.frequency,
        currentStreak: habit.current_streak,
        maxStreak: habit.max_streak,
    };
}
