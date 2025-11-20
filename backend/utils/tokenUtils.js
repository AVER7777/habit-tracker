import crypto from 'crypto';

import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config.js';

export function generateAccessToken(user) {
    return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '15m' });
}

export function generateRefreshToken() {
    return crypto.randomBytes(40).toString('hex');
}
