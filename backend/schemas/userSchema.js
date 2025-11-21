import { z } from 'zod';

import { emailSchema, nameSchema, passwordSchema } from './baseSchemas.js';

// Export
export const updateEmailSchema = z.object({
    body: z.object({
        email: emailSchema,
    }),
});

export const updateNameSchema = z.object({
    body: z.object({
        name: nameSchema,
    }),
});

export const updatePasswordSchema = z.object({
    body: z.object({
        password: passwordSchema,
    }),
});
