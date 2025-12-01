import { entryDTO } from '../dtos/entryDTO.js';
import { deleteEntryById, insertEntry } from '../models/entriesModel.js';
import { refreshHabitStreak } from '../services/habitService.js';
import ApiError from '../utils/ApiError.js';

export async function addEntry(req, res, next) {
    try {
        const { habitId } = req.body;
        const date = req.body.date ?? new Date().toISOString();
        const userId = req.user.id;

        const entry = await insertEntry({ habitId, date });

        const result = await refreshHabitStreak(habitId, userId);

        return res.status(201).json({ ...entryDTO(entry), newStreak: result.newStreak });
    } catch (error) {
        next(error);
    }
}

export async function deleteEntry(req, res, next) {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const deletedEntry = await deleteEntryById(id);

        if (!deletedEntry) {
            throw new ApiError('Entry not found', 404);
        }

        await refreshHabitStreak(deletedEntry.habit_id, userId);

        return res.status(204).end();
    } catch (error) {
        next(error);
    }
}
