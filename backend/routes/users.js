import express from 'express';
import { getUserById } from '../controllers/usersController.js';

const router = express.Router();

// Get a user by id
router.get('/:id', getUserById);

export default router;