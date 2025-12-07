import { entryDTO } from '../dtos/entryDTO.js';
import { deleteEntryByDate, insertEntry } from '../models/entriesModel.js';
import { refreshHabitStreak } from '../services/habitService.js';

export async function addEntry(req, res, next) {
    try {
        const { habitId } = req.body;
        const date = req.body.date ?? new Date().toISOString();
        const userId = req.user.id;

        const entry = await insertEntry({ habitId, date });

        const newStreakValue = await refreshHabitStreak(habitId, userId);

        return res.status(201).json({ ...entryDTO(entry), newStreak: newStreakValue });
    } catch (error) {
        next(error);
    }
}

export async function deleteEntry(req, res, next) {
    try {
        const { habitId } = req.params;
        const { date } = req.body;
        const userId = req.user.id;

        await deleteEntryByDate(habitId, date);
        await refreshHabitStreak(habitId, userId);

        return res.status(204).end();
    } catch (error) {
        next(error);
    }
}
