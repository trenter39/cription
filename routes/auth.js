import express from 'express';
import { body } from 'express-validator';
import {
    register,
    login,
    logout,
    getAccount
} from '../controllers/auth.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
    '/register',
    [
        body('username').trim().isLength({ min: 3, max: 50 }),
        body('email').isEmail(),
        body('password').notEmpty()
    ],
    register
);

router.post('/login', login);
router.post('/logout', logout);
router.get('/account', verifyToken, getAccount);

export default router;