export function entryDTO(entry) {
    if (!entry) {
        return null;
    }

    return {
        id: entry.id,
        habitId: entry.habit_id,
        date: entry.date,
    };
}
