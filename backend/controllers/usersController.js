import bcrypt from 'bcrypt';

import { userDTO } from '../dtos/userDTO.js';
import {
    deleteUserById,
    findById,
    updateEmail,
    updateName,
    updatePassword,
} from '../models/usersModel.js';
import ApiError from '../utils/ApiError.js';
import { validateEmail, validatePassword } from '../utils/validation.js';

export async function getUser(req, res, next) {
    try {
        const userId = req.user.id;

        const user = await findById(userId);

        if (!user) {
            throw new ApiError('User not found', 404);
        }

        res.status(200).json(userDTO(user));
    } catch (error) {
        next(error);
    }
}

export async function updateUserEmail(req, res, next) {
    try {
        const { email } = req.body || {};

        const userId = req.user.id;

        if (!validateEmail(email)) {
            throw new ApiError('Invalid email address', 422);
        }

        const user = await findById(userId);

        if (!user) {
            throw new ApiError('User not found', 404);
        }

        if (email === user.email) {
            return res.status(200).json(userDTO(user));
        }

        const updatedUser = await updateEmail(userId, email);

        res.status(200).json(userDTO(updatedUser));
    } catch (error) {
        next(error);
    }
}

export async function updateUserName(req, res, next) {
    try {
        const { name } = req.body || {};

        const userId = req.user.id;

        if (!name || name.length < 3) {
            throw new ApiError('Name must be at least 3 characters long', 422);
        }

        const user = await findById(userId);

        if (!user) {
            throw new ApiError('User not found', 404);
        }

        if (name === user.name) {
            return res.status(200).json(userDTO(user));
        }

        const updatedUser = await updateName(userId, name);

        res.status(200).json(userDTO(updatedUser));
    } catch (error) {
        next(error);
    }
}

export async function updateUserPassword(req, res, next) {
    try {
        const { password } = req.body || {};

        const userId = req.user.id;

        if (!validatePassword(password)) {
            throw new ApiError('Invalid password format', 422);
        }

        const user = await findById(userId);

        if (!user) {
            throw new ApiError('User not found', 404);
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            return res.status(200).json(userDTO(user));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await updatePassword(userId, hashedPassword);

        res.status(200).json(userDTO(updatedUser));
    } catch (error) {
        next(error);
    }
}

export async function deleteUser(req, res, next) {
    try {
        const userId = req.user.id;

        const user = await deleteUserById(userId);

        if (!user) {
            throw new ApiError('User not found', 404);
        }

        res.status(204).end();
    } catch (error) {
        next(error);
    }
}
