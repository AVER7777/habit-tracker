import pg from 'pg';

import { DB_CONFIG } from './config.js';

export const { Pool } = pg;

// PostgreSQL uses a connection pool to manage multiple connections and avoid
// creating a new connection for each query
export const pool = new Pool({ DB_CONFIG });
