import express from 'express';

import { addEntry, deleteEntry } from '../controllers/entriesController.js';
import { auth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { createEntrySchema, deleteEntrySchema } from '../schemas/entrySchema.js';

const router = express.Router();

// Create
router.post('/', auth, validate(createEntrySchema), addEntry);

// Delete
router.delete('/:habitId/', auth, validate(deleteEntrySchema), deleteEntry);

export default router;
