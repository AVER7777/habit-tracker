import ApiError from "../utils/ApiError.js";

export function entryDTO(habitEntry) {
    if (!habitEntry) {
        throw new ApiError('Habit entry not found', 404);
    }
    return {
        id: habitEntry.id,
        date: habitEntry.date,
    }
}