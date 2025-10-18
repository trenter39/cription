import db from '../config/db.js';

export async function loadWordCount() {
    let wordCounts = {};
    const result = await db.query('select level, count(*) from words group by level');
    result.rows.forEach(row => {
        wordCounts[row.level] = parseInt(row.count, 10);
    });
    return wordCounts;
}

export async function fetchA1Words() {
    const sql = "select * from words where level = 'A1'";
    const result = await db.query(sql);
    return result.rows.length ? result.rows : null;
}