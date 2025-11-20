import { pool } from '../db.js';
import { handleDbError } from '../utils/handleDbError.js';

// Create
export async function create({ name, email, passwordHash }) {
    try {
        const { rows } = await pool.query(
            `INSERT INTO users (name, email, password_hash) 
             VALUES ($1, $2, $3)
             RETURNING *`,
            [name, email, passwordHash],
        );

        return rows[0];
    } catch (error) {
        handleDbError(error);
    }
}

// Read
export async function findById(id) {
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

        return rows[0] ?? null;
    } catch (error) {
        handleDbError(error);
    }
}

export async function findByEmail(email) {
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        return rows[0] ?? null;
    } catch (error) {
        handleDbError(error);
    }
}

export async function findByRefreshToken(refreshToken) {
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE refresh_token = $1', [
            refreshToken,
        ]);

        return rows[0] ?? null;
    } catch (error) {
        handleDbError(error);
    }
}

// Update
export async function updateEmail(id, email) {
    try {
        const { rows } = await pool.query(
            `UPDATE users SET email = $1 WHERE id = $2
            RETURNING *`,
            [email, id],
        );

        return rows[0] ?? null;
    } catch (error) {
        handleDbError(error);
    }
}

export async function updateName(id, name) {
    try {
        const { rows } = await pool.query(
            `UPDATE users SET name = $1 WHERE id = $2
            RETURNING *`,
            [name, id],
        );

        return rows[0] ?? null;
    } catch (error) {
        handleDbError(error);
    }
}

export async function updatePassword(id, passwordHash) {
    try {
        const { rows } = await pool.query(
            `UPDATE users SET password_hash = $1 WHERE id = $2
            RETURNING *`,
            [passwordHash, id],
        );

        return rows[0] ?? null;
    } catch (error) {
        handleDbError(error);
    }
}
