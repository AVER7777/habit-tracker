import { pool } from '../db.js';
import { handleDbError } from '../utils/handleDbError.js';

// Create
export async function insertEntry({ habitId, date }) {
    try {
        const { rows } = await pool.query(
            `INSERT INTO entries (habit_id, date) 
             VALUES ($1, $2) 
             RETURNING *`,
            [habitId, date],
        );
        return rows[0] ?? null;
    } catch (error) {
        throw handleDbError(error);
    }
}
