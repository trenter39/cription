import express from 'express';
import { verifyToken } from './auth.js';
import { getUserProgress } from '../controllers/words.js';

const router = express.Router();

router.get('/', verifyToken, async(req, res) => {
    try {
        const progress = await getUserProgress(req.user.id);
        res.json(progress);
    } catch (err) {
        console.error('Error fetching progress:', err);
        res.status(500).json({message: 'Internal server error'});
    }
});

export default router;