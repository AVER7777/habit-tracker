import { z } from 'zod';

import { emailSchema, passwordSchema } from './baseSchemas.js';

// Schema
const simplePasswordSchema = z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password cannot be empty');

// Export
export const loginSchema = z.object({
    body: z.object({
        email: emailSchema,
        password: simplePasswordSchema,
    }),
});

export const registerSchema = z.object({
    body: z.object({
        email: emailSchema,
        password: passwordSchema,
    }),
});
