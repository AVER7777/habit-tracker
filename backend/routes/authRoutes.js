import express from 'express';

import { login, logout, refresh } from '../controllers/authController.js';

const router = express.Router();

// Create
router.post('/login', login);
router.post('/refresh', refresh);

// Delete
router.delete('/logout', logout);

export default router;
