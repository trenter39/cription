import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '10m';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

router.post(
    '/register',
    [
        body('username').trim().notEmpty().withMessage('Username is required').isLength({ min: 3, max: 50 }).withMessage('Username must be between 3-50 characters'),
        body('email').isEmail().withMessage('Invalid email address').normalizeEmail(),
        body('password').matches(passwordRegex).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { username, email, password } = req.body;
        try {
            const existingUser = await db.query(
                "select * from users where username = $1 or email = $2",
                [username, email]
            );
            if (existingUser.rows.length > 0) {
                const conflictField = existingUser.rows[0].username === username ? 'Username' : 'Email';
                return res.status(409).json({ message: `${conflictField} already exists` });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.query(
                'insert into users (username, email, password_hash) values ($1, $2, $3)',
                [username, email, hashedPassword]
            );
            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            console.error('Registration error:', err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid email address').normalizeEmail(),
        body('password').notEmpty().withMessage('Password is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { email, password } = req.body;
        try {
            const result = await db.query(
                'select * from users where email = $1',
                [email]
            );
            if (result.rows.length === 0) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const user = result.rows[0];
            const validPassword = await bcrypt.compare(password, user.password_hash);
            if (!validPassword) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
                expiresIn: JWT_EXPIRES_IN,
            });
            res.status(200).json({
                message: 'Login successful', token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    guessed_words: user.guessed_words,
                    failed_attempts: user.failed_attempts,
                }
            });
        } catch (err) {
            console.error('Login error:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
);

export function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided!' });
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });
        req.user = decoded;
        next();
    });
}

router.get('/account', verifyToken, async (req, res) => {
    try {
        const result = await db.query('select * from users where id = $1', [req.user.id]);
        if (result.rows.length === 0)
            return res.status(404).json({ message: 'User not found!'});
        const user = result.rows[0];
        res.json({
            username: user.username,
            email: user.email,
            guessed_words: user.guessed_words,
            failed_attempts: user.failed_attempts
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
})

export default router;