import bcrypt from 'bcrypt';

import { findUserByEmail } from '../models/usersModel.js';

import ApiError from './ApiError.js';

export async function authenticateUser(email, password) {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new ApiError('Invalid credentials', 401);
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
        throw new ApiError('Invalid credentials', 401);
    }

    return user;
}
