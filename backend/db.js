import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

export const { Pool } = pg;

// PostgreSQL uses a connection pool to manage multiple connections and avoid
// creating a new connection for each query
export const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});