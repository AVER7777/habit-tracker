import bcrypt from 'bcrypt';
import {create, findByEmail, findById} from "../models/usersModel.js";
import { userDTO } from "../dtos/userDTO.js";
import {validateEmail, validatePassword} from "../utils/validation.js";
import ApiError from "../utils/ApiError.js";

export async function createUser(req, res, next) {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || name.length < 3) {
            throw new ApiError("Name must be at least 3 characters long");
        }

        if (!email || !validateEmail(email)) {
            throw new ApiError("Invalid email address");
        }

        if (!password || !validatePassword(password)) {
            throw new ApiError("Invalid password format");
        }

        // Verifying email
        const existingUser = await findByEmail(email);

        if (existingUser) {
            throw new ApiError("Email already in use")
        }

        // Password hashing
        const password_hash = await bcrypt.hash(password, 10);

        // Creation in DB
        const user = await create({name, email, password_hash});

        res.status(201).json(userDTO(user));
    }
    catch (error) {
        next(error);
    }
}

export async function getUserById(req, res, next) {
    const userId = req.params.id;

    try {
        const user = await findById(userId);
        res.json(userDTO(user));
    }
    catch (error) {
        next(error);
    }
}