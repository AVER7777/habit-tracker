import { pool } from '../db.js';
import { handleDbError } from '../utils/handleDbError.js';

export async function create({ name, email, password_hash }) {
    try {
        const { rows } = await pool.query(
            `INSERT INTO users (name, email, password_hash) 
             VALUES ($1, $2, $3)
             RETURNING *`,
            [name, email, password_hash],
        );

        return rows[0];
    } catch (error) {
        handleDbError(error);
    }
}

export async function findById(id) {
    try {
        const { rows } = await pool.query(
            'SELECT * FROM users WHERE id = $1',
            [id],
        );

        return rows[0] ?? null;
    } catch (error) {
        handleDbError(error);
    }
}

export async function findByEmail(email) {
    try {
        const { rows } = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email],
        );

        return rows[0] ?? null;
    } catch (error) {
        handleDbError(error);
    }
}

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

export async function updatePassword(id, password_hash) {
    try {
        const { rows } = await pool.query(
            `UPDATE users SET password_hash = $1 WHERE id = $2
            RETURNING *`,
            [password_hash, id],
        );

        return rows[0] ?? null;
    } catch (error) {
        handleDbError(error);
    }
}