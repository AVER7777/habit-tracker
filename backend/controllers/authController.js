import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import { updateRefreshToken } from '../models/authModel.js';
import { findByEmail, findByRefreshToken } from '../models/usersModel.js';
import ApiError from '../utils/ApiError.js';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtils.js';

dotenv.config();

export async function login(req, res, next) {
    try {
        const { email, password } = req.body || {};

        if (!email || !password) {
            throw new ApiError('Missing credentials', 400);
        }

        const user = await findByEmail(email);

        if (!user) {
            throw new ApiError('Invalid credentials', 401);
        }

        const validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
            throw new ApiError('Invalid credentials', 401);
        }

        // Tokens generation
        const accessToken = generateAccessToken(user);

        const refreshToken = generateRefreshToken();

        const expirationDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

        // DB saving
        await updateRefreshToken(user.id, refreshToken, expirationDate.toISOString());

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 90 * 24 * 60 * 60 * 1000,
        });

        res.json({
            accessToken,
            user: { id: user.id, name: user.name, email: user.email },
        });

    } catch (error) {
        next(error);
    }
}

export async function refresh(req, res, next) {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            throw new ApiError('No refresh token provided', 401);
        }

        const user = await findByRefreshToken(refreshToken);

        if (!user) {
            throw new ApiError('Invalid refresh token', 401);
        }

        // Verify expiration
        const tokenExpiration = new Date(user.refresh_token_expiration);

        if (Date.now() > tokenExpiration.getTime()) {
            throw new ApiError('Refresh token expired', 401);
        }

        // New access token
        const newAccessToken = generateAccessToken(user);

        // Token rotation
        const newRefreshToken = generateRefreshToken();

        const newExpirationDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

        await updateRefreshToken(user.id, newRefreshToken, newExpirationDate.toISOString());

        // Send cookie and JWT
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 90 * 24 * 60 * 60 * 1000,
        });

        res.json({ accessToken: newAccessToken });

    } catch (error) {
        next(error);
    }
}