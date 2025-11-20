import { pool } from '../db.js';
import { handleDbError } from '../utils/handleDbError.js';

export async function updateRefreshToken(userId, refreshToken, expirationDate) {
    try {
        const { rows } = await pool.query(
            `UPDATE users SET refresh_token = $1, refresh_token_expiration = $2 WHERE id = $3
            RETURNING *`,
            [refreshToken, expirationDate, userId],
        );

        return rows[0] ?? null;
    } catch (error) {
        handleDbError(error);
    }
}

export async function deleteRefreshToken(userId) {
    try {
        const { rows } = await pool.query(
            `UPDATE users 
            SET refresh_token = NULL, 
                refresh_token_expiration = NULL 
            WHERE id = $1
            RETURNING *`,
            [userId],
        );

        return rows[0] ?? null;
    } catch (error) {
        handleDbError(error);
    }
}
