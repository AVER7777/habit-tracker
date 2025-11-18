import express from 'express';
import {createUser, getUserById} from '../controllers/usersController.js';

const router = express.Router();

// Create a user
router.post('/', createUser);

// Get a user by id
router.get('/:id', getUserById);

export default router;