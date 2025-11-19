import express from 'express';

import { login, refresh } from '../controllers/authController.js';

const router = express.Router();

// Create
router.post('/login', login);
router.post('/refresh', refresh);

export default router;