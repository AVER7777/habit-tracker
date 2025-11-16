export function habitDTO(habit) {
    return {
        id: habit.id,
        name: habit.name,
        color: habit.color,
        frequency: habit.frequency
    }
}