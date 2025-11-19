export function habitDTO(habit) {
    if (!habit) {
        return null;
    }

    return {
        id: habit.id,
        name: habit.name,
        color: habit.color,
        frequency: habit.frequency,
    };
}