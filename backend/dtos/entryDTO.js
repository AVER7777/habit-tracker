export function entryDTO(entry) {
    if (!entry) {
        return null;
    }

    return {
        id: entry.id,
        habitId: entry.habitId,
        date: entry.date,
    };
}
