import { z } from 'zod';

import { genericEmailSchema, genericPasswordSchema } from './baseSchemas.js';

// Schema
const simplePasswordSchema = z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password cannot be empty');

// Export
export const loginSchema = z.object({
    body: z.object({
        email: genericEmailSchema,
        password: simplePasswordSchema,
    }),
});

export const registerSchema = z.object({
    body: z.object({
        email: genericEmailSchema,
        password: genericPasswordSchema,
    }),
});
