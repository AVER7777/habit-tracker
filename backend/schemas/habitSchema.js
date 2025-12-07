import { z } from 'zod';

import { genericIdSchema, genericNameSchema } from './baseSchemas.js';

// Schemas
const colorRegex = /^#[0-9a-f]{6}$/;

const colorSchema = z
    .string({
        required_error: 'Color is required',
    })
    .regex(colorRegex, {
        message: 'Invalid color format. Please use a hexadecimal color code (e.g., #FF0000).',
    });

const frequencySchema = z
    .number({
        required_error: 'Frequency is required',
    })
    .int({ message: 'Frequency must be an integer' })
    .min(1, { message: 'Frequency must be at least 1' })
    .max(7, { message: 'Frequency must be at most 7' });

// Export
export const createHabitSchema = z.object({
    body: z.object({
        name: genericNameSchema,
        color: colorSchema,
        frequency: frequencySchema,
    }),
});

export const getHabitSchema = z.object({
    params: z.object({
        id: genericIdSchema,
    }),
});

export const updateHabitNameSchema = z.object({
    params: z.object({
        id: genericIdSchema,
    }),
    body: z.object({
        name: genericNameSchema,
    }),
});

export const updateHabitColorSchema = z.object({
    params: z.object({
        id: genericIdSchema,
    }),
    body: z.object({
        color: colorSchema,
    }),
});

export const updateHabitFrequencySchema = z.object({
    params: z.object({
        id: genericIdSchema,
    }),
    body: z.object({
        frequency: frequencySchema,
    }),
});
