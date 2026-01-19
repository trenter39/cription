import { Pool } from 'pg';
import {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD
} from './conf.js';

const db = new Pool({
    host: DB_HOST || "localhost",
    port: DB_PORT || 5432,
    database: DB_NAME || "cription",
    user: DB_USER || "postgres",
    password: DB_PASSWORD || "password"
});

db.connect()
    .then(client => {
        console.log('Connected to PostgreSQL database');
        client.release();
    })
    .catch(err => console.error('Error trying to connect to the database:', err.message));

export default db;