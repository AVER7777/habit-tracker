import { pool } from '../db.js';
import { handleDbError } from '../utils/handleDbError.js';

// Create
export async function insertUser({ email, passwordHash }) {
    try {
        const { rows } = await pool.query(
            `INSERT INTO users (email, password_hash) 
             VALUES ($1, $2)
             RETURNING *`,
            [email, passwordHash],
        );

        return rows[0] ?? null;
    } catch (error) {
        throw handleDbError(error);
    }
}

// Read
export async function findUserById(id) {
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

        return rows[0] ?? null;
    } catch (error) {
        throw handleDbError(error);
    }
}

export async function findUserByEmail(email) {
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        return rows[0] ?? null;
    } catch (error) {
        throw handleDbError(error);
    }
}

export async function findUserByRefreshToken(refreshToken) {
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE refresh_token = $1', [
            refreshToken,
        ]);

        return rows[0] ?? null;
    } catch (error) {
        throw handleDbError(error);
    }
}

// Update
export async function updateUserByEmail(id, email) {
    try {
        const { rows } = await pool.query(
            `UPDATE users SET email = $1 WHERE id = $2
            RETURNING *`,
            [email, id],
        );

        return rows[0] ?? null;
    } catch (error) {
        throw handleDbError(error);
    }
}

export async function updateUserByName(id, name) {
    try {
        const { rows } = await pool.query(
            `UPDATE users SET name = $1 WHERE id = $2
            RETURNING *`,
            [name, id],
        );

        return rows[0] ?? null;
    } catch (error) {
        throw handleDbError(error);
    }
}

export async function updateUserByPassword(id, passwordHash) {
    try {
        const { rows } = await pool.query(
            `UPDATE users SET password_hash = $1 WHERE id = $2
            RETURNING *`,
            [passwordHash, id],
        );

        return rows[0] ?? null;
    } catch (error) {
        throw handleDbError(error);
    }
}

// Delete
export async function deleteUserById(id) {
    try {
        const { rows } = await pool.query(
            `DELETE FROM users WHERE id = $1
            RETURNING id`,
            [id],
        );

        return rows[0] ?? null;
    } catch (error) {
        throw handleDbError(error);
    }
}
