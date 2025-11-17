import ApiError from "../utils/ApiError.js";

export function habitDTO(habit) {
    if (!habit) {
        throw new ApiError('Habit not found', 404);
    }
    return {
        id: habit.id,
        name: habit.name,
        color: habit.color,
        frequency: habit.frequency
    }
}