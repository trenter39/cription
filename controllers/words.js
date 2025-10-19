import db from '../config/db.js';

export async function loadWordCount() {
    let wordCounts = {};
    const result = await db.query('select level, count(*) from words group by level');
    result.rows.forEach(row => {
        wordCounts[row.level] = parseInt(row.count, 10);
    });
    return wordCounts;
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

export async function getRandomWord(level, userId) {
    const sql = `select w.word, w.description_en, w.example1_en, w.example2_en
                from words w
                left join user_words uw on uw.word_id = w.id and uw.user_id = $2 and uw.is_guessed = true
                where w.level = $1 and uw.word_id is null
                order by random()
                limit 1`;
    const { rows } = await db.query(sql, [level, userId]);
    return rows[0];
}