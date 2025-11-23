import { entryDTO } from '../dtos/entryDTO.js';
import { insertEntry } from '../models/entriesModel.js';

export async function addEntry(req, res, next) {
    try {
        const { habitId } = req.body;

        const date = new Date().toISOString();

        const entry = await insertEntry({ habitId, date });

        return res.status(201).json(entryDTO(entry));
    } catch (error) {
        next(error);
    }
}
