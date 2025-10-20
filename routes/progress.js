import express from 'express';
import { verifyToken } from './auth.js';
import { getUserProgress, markWordGuessed, markWordAttempt } from '../controllers/words.js';

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
    try {
        const progress = await getUserProgress(req.user.id);
        res.json(progress);
    } catch (err) {
        console.error('Error fetching progress:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/guess', verifyToken, async (req, res) => {
    const userId = req.user.id;
    const { word_id } = req.body;
    if (!word_id) {
        return res.status(400).json({ message: 'Word ID is required!' });
    }
    try {
        await markWordGuessed(userId, word_id);
        const progress = await getUserProgress(userId);
        res.json(progress);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating guessed word!' });
    }
});

router.post('/attempt', verifyToken, async (req, res) => {
    const userId = req.user.id;
    const { word_id } = req.body;
    if (!word_id) {
        return res.status(400).json({ message: 'Word ID is required!' });
    }
    try {
        await markWordAttempt(userId, word_id);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating word as attempt!' });
    }
});

export default router;