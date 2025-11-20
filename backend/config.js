import path from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '.env');

const result = dotenv.config({ path: envPath });

if (result.error) {
    console.warn('No .env file found. Using default environment variables.');
}

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Express server
export const PORT = Number(process.env.PORT) || 3000;

// PostgreSQL configuration
export const DB_CONFIG = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'database',
    port: Number(process.env.DB_PORT) || 5432,
};

// Authentication tokens
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const REFRESH_TOKEN_DAYS = Number(process.env.REFRESH_TOKEN_DAYS) || 90;
export const REFRESH_TOKEN_MS = REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000;

export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: REFRESH_TOKEN_MS,
};
