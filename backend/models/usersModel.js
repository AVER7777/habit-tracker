import { pool } from "../db.js";

export async function create({ name, email, password_hash }) {
    const { rows } = await pool.query(
        `INSERT INTO users (name, email, password_hash) 
         VALUES ($1, $2, $3)
         RETURNING *`,
        [name, email, password_hash]
    );
    return rows[0];
}

export async function findById(id) {
    const { rows } = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
    );
    return rows[0] ?? null;
}

export async function findByEmail(email) {
    const { rows } = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );
    return rows[0] ?? null;
}