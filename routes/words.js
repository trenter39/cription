import express from 'express';
import { verifyToken } from './auth.js';
import { getRandomWord } from '../controllers/words.js';

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
    const level = req.query.level;
    const userId = req.user.id;
    try {
        const randomWord = await getRandomWord(level, userId);
        res.json(randomWord);
    } catch (err) {
        console.error('Error fetching random word:', err);
        res.status(500).json({ error: 'Internal server error!' });
    }
});

export default router;