import bcrypt from 'bcrypt';

import { COOKIE_OPTIONS, REFRESH_TOKEN_MS } from '../config.js';
import { userDTO } from '../dtos/userDTO.js';
import { deleteRefreshToken, updateRefreshToken } from '../models/authModel.js';
import { findUserByRefreshToken, insertUser } from '../models/usersModel.js';
import ApiError from '../utils/ApiError.js';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtils.js';
import { validateLogin, validateRegister } from '../utils/validation.js';

export async function register(req, res, next) {
    try {
        const { email, password } = req.body || {};

        validateRegister({ email, password });

        // Verifying email
        const userExists = await findUserByRefreshToken(email);

        if (userExists) {
            throw new ApiError('Email already in use', 409);
        }

        // Password hashing
        const passwordHash = await bcrypt.hash(password, 10);

        // Creation in DB
        const user = await insertUser({ email, passwordHash });

        res.status(201).json(userDTO(user));
    } catch (error) {
        next(error);
    }
}

export async function login(req, res, next) {
    try {
        const { email, password } = req.body || {};

        const user = await validateLogin(email, password);

        // Tokens generation
        const accessToken = generateAccessToken(user);

        const refreshToken = generateRefreshToken();

        const expirationDate = new Date(Date.now() + REFRESH_TOKEN_MS);

        // DB saving
        await updateRefreshToken(user.id, refreshToken, expirationDate.toISOString());

        res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);

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

        const user = await findUserByRefreshToken(refreshToken);

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

        const newExpirationDate = new Date(Date.now() + REFRESH_TOKEN_MS);

        await updateRefreshToken(user.id, newRefreshToken, newExpirationDate.toISOString());

        // Send cookie and JWT
        res.cookie('refreshToken', newRefreshToken, COOKIE_OPTIONS);

        res.json({ accessToken: newAccessToken });
    } catch (error) {
        next(error);
    }
}

export async function logout(req, res, next) {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            return res.status(204).end();
        }

        const user = await findUserByRefreshToken(refreshToken);

        if (user) {
            await deleteRefreshToken(user.id);
        }

        const clearCookieOptions = { ...COOKIE_OPTIONS };
        delete clearCookieOptions.maxAge;

        res.clearCookie('refreshToken', clearCookieOptions);

        res.status(204).end();
    } catch (error) {
        next(error);
    }
}
