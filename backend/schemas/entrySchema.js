import { z } from 'zod';

import { genericIdSchema } from './baseSchemas.js';

// Export
export const createEntrySchema = z.object({
    body: z.object({
        habitId: genericIdSchema,
    }),
});

export const deleteEntrySchema = z.object({
    params: z.object({
        id: genericIdSchema,
    }),
});
