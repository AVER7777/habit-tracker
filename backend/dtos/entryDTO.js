export function entryDTO(habitEntry) {
    if (!habitEntry) {
        return null;
    }

    return {
        id: habitEntry.id,
        date: habitEntry.date,
    };
}