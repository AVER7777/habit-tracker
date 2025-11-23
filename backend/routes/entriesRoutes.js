import express from 'express';

import { addEntry } from '../controllers/entriesController.js';
import { auth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { createEntrySchema } from '../schemas/entrySchema.js';

const router = express.Router();

// Create
router.post('/', auth, validate(createEntrySchema), addEntry);

export default router;
