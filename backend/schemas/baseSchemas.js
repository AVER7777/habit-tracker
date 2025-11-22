// Schemas
import { z } from 'zod';

export const genericIdSchema = z
    .union([z.string(), z.number()])
    .pipe(
        z.coerce
            .number()
            .int('Invalid ID format. Please provide a valid integer.')
            .positive('ID must be a positive number.'),
    );

export const genericNumberSchema = z
    .number({ required_error: 'Number is required' })
    .int('Invalid number format. Please provide a valid integer.')
    .positive('Number must be a positive number.');

export const genericEmailSchema = z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' });

// min 8 chars, at least 1 uppercase, 1 lowercase, 1 digit, not 3 identical consecutive chars
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*(.)\1\1).{8,32}$/;

export const genericPasswordSchema = z
    .string({
        required_error: 'Password is required',
    })
    .regex(passwordRegex, {
        message:
            'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.',
    });

export const genericNameSchema = z
    .string({ required_error: 'Name is required' })
    .min(3, { message: 'Name must be at least 3 characters long' });
