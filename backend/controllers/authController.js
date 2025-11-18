import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { findByEmail } from '../models/usersModel.js';
import ApiError from '../utils/ApiError.js';

dotenv.config();

export async function login(req, res, next) {
    try {
        const { email, password } = req.body || {};

        const user = await findByEmail(email);

        if (!user) {
            throw new ApiError('Invalid credentials', 401);
        }

        const validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
            throw new ApiError('Invalid credentials', 401);
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user.id, name: user.name } });
    } catch (error) {
        next(error);
    }
}