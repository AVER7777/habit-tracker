import bcrypt from 'bcrypt';

import { userDTO } from '../dtos/userDTO.js';
import {
    deleteUserById,
    findUserById,
    updateUserByEmail,
    updateUserByName,
    updateUserByPassword,
} from '../models/usersModel.js';
import ApiError from '../utils/ApiError.js';

export async function getUser(req, res, next) {
    try {
        const userId = req.user.id;

        const user = await findUserById(userId);

        if (!user) {
            throw new ApiError('User not found', 404);
        }

        res.status(200).json(userDTO(user));
    } catch (error) {
        next(error);
    }
}

export async function updateEmail(req, res, next) {
    try {
        const { email } = req.body;

        const userId = req.user.id;

        const user = await findUserById(userId);

        if (!user) {
            throw new ApiError('User not found', 404);
        }

        if (email === user.email) {
            return res.status(200).json(userDTO(user));
        }

        const updatedUser = await updateUserByEmail(userId, email);

        res.status(200).json(userDTO(updatedUser));
    } catch (error) {
        next(error);
    }
}

export async function updateName(req, res, next) {
    try {
        const { name } = req.body;

        const userId = req.user.id;

        const user = await findUserById(userId);

        if (!user) {
            throw new ApiError('User not found', 404);
        }

        if (name === user.name) {
            return res.status(200).json(userDTO(user));
        }

        const updatedUser = await updateUserByName(userId, name);

        res.status(200).json(userDTO(updatedUser));
    } catch (error) {
        next(error);
    }
}

export async function updatePassword(req, res, next) {
    try {
        const { password } = req.body;

        const userId = req.user.id;

        const user = await findUserById(userId);

        if (!user) {
            throw new ApiError('User not found', 404);
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (isMatch) {
            return res.status(200).json(userDTO(user));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await updateUserByPassword(userId, hashedPassword);

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
