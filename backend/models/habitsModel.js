import { pool } from '../db.js';
import { handleDbError } from '../utils/handleDbError.js';

// Create
export async function insertHabit({ userId, name, color, frequency }) {
    try {
        const { rows } = await pool.query(
            `INSERT INTO habits (user_id, name, color, frequency)
             VALUES ($1, $2, $3, $4)
             RETURNING *;`,
            [userId, name, color, frequency],
        );
        return rows[0] ?? null;
    } catch (error) {
        handleDbError(error);
    }
}

// Read
export async function findAllUserHabits(userId) {
    try {
        const { rows } = await pool.query('SELECT * FROM habits WHERE user_id = $1', [userId]);
        return rows ?? null;
    } catch (error) {
        handleDbError(error);
    }
}

export async function findHabitById(id, userId) {
    try {
        const { rows } = await pool.query('SELECT * FROM habits WHERE id = $1 AND user_id = $2', [
            id,
            userId,
        ]);
        return rows[0] ?? null;
    } catch (error) {
        handleDbError(error);
    }
}

// Update
export async function updateHabitNameById(id, userId, newName) {
    try {
        const { rows } = await pool.query(
            `UPDATE habits SET name = $1 
             WHERE id = $2 AND user_id = $3 
             RETURNING *;`,
            [newName, id, userId],
        );
        return rows[0] ?? null;
    } catch (error) {
        handleDbError(error);
    }
}

export async function updateHabitColorById(id, userId, newColor) {
    try {
        const { rows } = await pool.query(
            `UPDATE habits SET color = $1 
             WHERE id = $2 AND user_id = $3 
             RETURNING *;`,
            [newColor, id, userId],
        );
        return rows[0] ?? null;
    } catch (error) {
        handleDbError(error);
    }
}

export async function updateHabitFrequencyId(id, userId, newFrequency) {
    try {
        const { rows } = await pool.query(
            `UPDATE habits SET frequency = $1 
             WHERE id = $2 AND user_id = $3 
             RETURNING *;`,
            [newFrequency, id, userId],
        );
        return rows[0] ?? null;
    } catch (error) {
        handleDbError(error);
    }
}

export async function updateHabitCurrentStreakById(id, userId, newCurrentStreak) {
    try {
        const { rows } = await pool.query(
            `UPDATE habits SET current_streak = $1 
             WHERE id = $2 AND user_id = $3 
             RETURNING *;`,
            [newCurrentStreak, id, userId],
        );
        return rows[0] ?? null;
    } catch (error) {
        handleDbError(error);
    }
}

export async function incrementHabitCurrentStreakById(id, userId) {
    try {
        const { rows } = await pool.query(
            `UPDATE habits SET current_streak = current_streak + 1 
             WHERE id = $1 AND user_id = $2
             RETURNING *;`,
            [id, userId],
        );
        return rows[0] ?? null;
    } catch (error) {
        handleDbError(error);
    }
}

export async function updateHabitMaxStreakById(id, userId, maxStreak) {
    try {
        const { rows } = await pool.query(
            `UPDATE habits set max_streak = $1 
             WHERE id = $2 AND user_id = $3 
             RETURNING *;`,
            [maxStreak, id, userId],
        );
        return rows[0] ?? null;
    } catch (error) {
        handleDbError(error);
    }
}

// Delete
export async function deleteHabitById(id, userId) {
    try {
        const { rows } = await pool.query(
            `DELETE FROM habits WHERE id = $1 AND user_id = $2
             RETURNING id;`,
            [id, userId],
        );
        return rows[0] ?? null;
    } catch (error) {
        handleDbError(error);
    }
}
