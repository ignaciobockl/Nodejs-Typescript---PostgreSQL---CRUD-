import { Pool } from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '39977093',
    database: 'firstapi',
    port: 5432
});