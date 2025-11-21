import express from 'express';

import { register, login, logout, refresh } from '../controllers/authController.js';
import { validate } from '../middlewares/validate.js';
import { loginSchema, registerSchema } from '../schemas/authSchema.js';

const router = express.Router();

// Create
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh', refresh);

// Delete
router.delete('/logout', logout);

export default router;
