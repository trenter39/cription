import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/conf.js';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

export async function register(req, res) {
    const { username, email, password } = req.body;

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: 'Password must contain uppercase, lowercase and number'
        });
    }

    try {
        const existingUser = await db.query(
            "select id from users where username = $1 or email = $2",
            [username, email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: 'Username or email already exists' });
        }

        const hash = await bcrypt.hash(password, 10);

        await db.query(
            'insert into users (username, email, password_hash) values ($1, $2, $3)',
            [username, email, hash]
        );

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    try {
        const result = await db.query(
            "select * from users where email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = result.rows[0];
        const valid = await bcrypt.compare(password, user.password_hash);

        if (!valid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export function logout(req, res) {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
}

export async function getAccount(req, res) {
    try {
        const result = await db.query(
            "select username, email from users where id = $1",
            [req.user.id]
        );

        if (!result.rows.length) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}