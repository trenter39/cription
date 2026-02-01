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

export async function getGuessAttempt(userId) {
    const sql = `select guessed_words, failed_attempts
                from users
                where id = $1`;
    const { rows } = await db.query(sql, [userId]);
    return rows[0];
}

export async function getRandomWord(level, userId) {
    const sql = `
        select w.id, w.word, w.description, w.example1, w.example2
        from words w
        left join user_words uw
            on uw.word_id = w.id
            and uw.user_id = $2
            and uw.is_guessed = true
        where w.level = $1 
            and uw.word_id is null
        order by random()
        limit 1`;
    const { rows } = await db.query(sql, [level, userId]);
    return rows[0];
}

export async function markWordGuessed(userId, wordId) {
    const checksql = `select id, is_guessed
                      from user_words
                      where user_id = $1 and word_id = $2`;
    const existingResult = await db.query(checksql, [userId, wordId]);
    let wasPreviouslyGuessed = false;
    if (existingResult.rows.length > 0) {
        wasPreviouslyGuessed = existingResult.rows[0].is_guessed;
        await db.query(
            `update user_words
            set is_guessed = true, attempts = attempts + 1, last_attempt_at = current_timestamp
            where user_id = $1 and word_id = $2`,
            [userId, wordId]);
    } else {
        await db.query(
            `insert into user_words (user_id, word_id, is_guessed, attempts)
            values ($1, $2, true, 1)`,
            [userId, wordId]
        );
    }
    if (!wasPreviouslyGuessed) {
        await db.query(
            `update users
            set guessed_words = guessed_words + 1
            where id = $1`,
            [userId]
        );
    }
}

export async function markWordAttempt(userId, wordId) {
    const checksql = 'select id from user_words where user_id = $1 and word_id = $2';
    const existingResult = await db.query(checksql, [userId, wordId]);
    if (existingResult.rows.length > 0) {
        await db.query(`update user_words
            set attempts = attempts + 1,
            last_attempt_at = current_timestamp
            where user_id = $1 and word_id = $2`,
            [userId, wordId]);
    } else {
        await db.query(
            `insert into user_words (user_id, word_id, is_guessed, attempts)
            values($1, $2, false, 1)`,
            [userId, wordId]);
    }
    await db.query(
        `update users
        set failed_attempts = failed_attempts + 1
        where id = $1`, [userId]);
}