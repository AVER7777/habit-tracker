import bcrypt from 'bcrypt';

import { userDTO } from '../dtos/userDTO.js';
import {
    create,
    findByEmail,
    findById,
    updateEmail,
    updateName,
    updatePassword,
} from '../models/usersModel.js';
import ApiError from '../utils/ApiError.js';
import { validateEmail, validatePassword, validateRegister } from '../utils/validation.js';

export async function createUser(req, res, next) {
    try {
        const { email, password } = req.body || {};

        validateRegister({ email, password });

        // Verifying email
        const userExists = await findByEmail(email);

        if (userExists) {
            throw new ApiError('Email already in use', 409);
        }

        // Password hashing
        const passwordHash = await bcrypt.hash(password, 10);

        // Creation in DB
        const user = await create({ email, passwordHash });

        res.status(201).json(userDTO(user));
    } catch (error) {
        next(error);
    }
}

export async function getUserById(req, res, next) {
    const userId = req.params.id;

    try {
        const user = await findById(userId);

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
