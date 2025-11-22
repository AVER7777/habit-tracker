import { z } from 'zod';

import { genericEmailSchema, genericNameSchema, genericPasswordSchema } from './baseSchemas.js';

// Export
export const updateUserEmailSchema = z.object({
    body: z.object({
        email: genericEmailSchema,
    }),
});

export const updateUserNameSchema = z.object({
    body: z.object({
        name: genericNameSchema,
    }),
});

export const updateUserPasswordSchema = z.object({
    body: z.object({
        password: genericPasswordSchema,
    }),
});
