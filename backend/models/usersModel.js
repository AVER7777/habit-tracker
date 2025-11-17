import { pool } from "../db.js";

export async function findById(id) {
    const { rows } = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
    );
    return rows[0] ?? null;
}