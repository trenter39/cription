import { Pool } from 'pg';
import {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT
} from './conf.js';

const db = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
});

db.connect()
    .then(client => {
        console.log('Connect to the database PostgreSQL');
        client.release();
    })
    .catch(err => console.error('Error trying to connect to the database:', err.message));

export default db;