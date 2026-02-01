import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/conf.js';

export function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unathorized' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}