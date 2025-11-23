import { z } from 'zod';

import { genericIdSchema } from './baseSchemas.js';

// Export
export const createEntrySchema = z.object({
    body: z.object({
        habitId: genericIdSchema,
    }),
});
