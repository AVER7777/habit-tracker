import express from 'express';

import { register, login, logout, refresh } from '../controllers/authController.js';

const router = express.Router();

// Create
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);

// Delete
router.delete('/logout', logout);

export default router;
