import crypto from 'crypto';

import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export function generateAccessToken(user) {
    return jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '15m' },
    );
}

export function generateRefreshToken() {
    return crypto.randomBytes(40).toString('hex');
}