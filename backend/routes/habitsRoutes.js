import express from 'express';

import {
    createHabit,
    deleteHabit,
    getAllHabits,
    getHabit,
    updateHabitColor,
    updateHabitFrequency,
    updateHabitName,
} from '../controllers/habitsController.js';
import { auth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import {
    createHabitSchema,
    getHabitSchema,
    updateHabitColorSchema,
    updateHabitFrequencySchema,
    updateHabitNameSchema,
} from '../schemas/habitSchema.js';

const routes = express.Router();

// Create
routes.post('/', auth, validate(createHabitSchema), createHabit);

// Read
routes.get('/all', auth, getAllHabits);
routes.get('/:id', auth, validate(getHabitSchema), getHabit);

// Update
routes.patch('/:id/name', auth, validate(updateHabitNameSchema), updateHabitName);
routes.patch('/:id/color', auth, validate(updateHabitColorSchema), updateHabitColor);
routes.patch('/:id/frequency', auth, validate(updateHabitFrequencySchema), updateHabitFrequency);

// Delete
routes.delete('/:id', auth, deleteHabit);

export default routes;
