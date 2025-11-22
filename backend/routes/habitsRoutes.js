import express from 'express';

import {
    createHabit,
    deleteHabit,
    getAllHabits,
    getHabit,
    incrementHabitCurrentStreak,
    updateHabitColor,
    updateHabitCurrentStreak,
    updateHabitFrequency,
    updateHabitMaxStreak,
    updateHabitName,
} from '../controllers/habitsController.js';
import { auth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import {
    createHabitSchema,
    getAllHabitsSchema,
    incrementHabitCurrentStreakSchema,
    updateHabitColorSchema,
    updateHabitCurrentStreakSchema,
    updateHabitFrequencySchema,
    updateHabitMaxStreakSchema,
    updateHabitNameSchema,
} from '../schemas/habitSchema.js';

const routes = express.Router();

// Create
routes.post('/', auth, validate(createHabitSchema), createHabit);

// Read
routes.get('/all', auth, getAllHabits);
routes.get('/:id', auth, validate(getAllHabitsSchema), getHabit);

// Update
routes.patch('/:id/name', auth, validate(updateHabitNameSchema), updateHabitName);
routes.patch('/:id/color', auth, validate(updateHabitColorSchema), updateHabitColor);
routes.patch('/:id/frequency', auth, validate(updateHabitFrequencySchema), updateHabitFrequency);
routes.patch(
    '/:id/current-streak',
    auth,
    validate(updateHabitCurrentStreakSchema),
    updateHabitCurrentStreak,
);
routes.patch(
    '/:id/increment-current-streak',
    auth,
    validate(incrementHabitCurrentStreakSchema),
    incrementHabitCurrentStreak,
);
routes.patch('/:id/max-streak', auth, validate(updateHabitMaxStreakSchema), updateHabitMaxStreak);

// Delete
routes.delete('/:id', auth, deleteHabit);

export default routes;
