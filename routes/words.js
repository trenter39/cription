import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getRandomWord } from '../controllers/words.js';

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
    const userId = req.user.id;
    const { level } = req.query;
    try {
        const word = await getRandomWord(level, userId);
        res.json(word);
    } catch (err) {
        console.error('Fetch random word error:', err);
        res.status(500).json({ error: 'Internal server error!' });
    }
});

export default router;