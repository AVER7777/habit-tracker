import ApiError from './ApiError.js';

export function validateEmail(email) {
    // Standard email format
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return regex.test(String(email).toLowerCase());
}

export function validatePassword(password) {
    // Min 8 chars, at least 1 uppercase, 1 lowercase, 1 digit, no 3 identical consecutive chars
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*(.)\1\1).{8,32}$/;

    return regex.test(String(password));
}

export function validateUserInput({ name, email, password }) {
    if (!name || name.length < 3) {
        throw new ApiError('Name must be at least 3 characters long', 422);
    }

    if (!email || !validateEmail(email)) {
        throw new ApiError('Invalid email address', 422);
    }

    if (!password || !validatePassword(password)) {
        throw new ApiError('Invalid password format', 422);
    }
}