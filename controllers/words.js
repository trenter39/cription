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

export async function getUserProgress(userId) {
    const sql = `select w.level, count(*) filter (where uw.is_guessed = true) as guessed_count, count(*) as total_count
                from words w
                left join user_words uw on uw.word_id = w.id and uw.user_id = $1
                group by w.level
                order by w.level`;
    const { rows } = await db.query(sql, [userId]);
    return rows;
}