import { pool } from '../db.js';
import { handleDbError } from '../utils/handleDbError.js';
import { calculateDailyStreak, calculateWeeklyStreak } from '../utils/streakCalculator.js';

export async function refreshHabitStreak(id, userId) {
    const habitData = await fetchHabitData(id, userId);

    if (!habitData) {
        return;
    }

    let newStreak;

    if (habitData.frequency === 7) {
        newStreak = calculateDailyStreak(habitData.dates);
    } else {
        newStreak = calculateWeeklyStreak(habitData.dates, habitData.frequency);
    }

    try {
        await pool.query(
            `UPDATE habits 
             SET current_streak = $1, max_streak = GREATEST(max_streak, $1) 
             WHERE id = $2`,
            [newStreak, id],
        );
    } catch (error) {
        throw handleDbError(error);
    }

    return newStreak;
}

async function fetchHabitData(id, userId) {
    try {
        const { rows } = await pool.query(
            `SELECT h.frequency, e.date FROM habits h
             LEFT JOIN entries e ON h.id = e.habit_id
             WHERE h.id = $1 AND h.user_id = $2
             ORDER BY e.date DESC;`,
            [id, userId],
        );

        if (rows.length === 0) {
            return null;
        }

        return {
            frequency: rows[0].frequency,
            dates: rows
                .map((r) => r.date)
                .filter((d) => d)
                .map((d) => new Date(d)),
        };
    } catch (error) {
        throw handleDbError(error);
    }
}
