import express from 'express';

import {
    deleteUser,
    getUser,
    updateEmail,
    updateName,
    updatePassword,
} from '../controllers/usersController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

// Get
router.get('/me', auth, getUser);

// Update
router.patch('/email', auth, updateEmail);
router.patch('/name', auth, updateName);
router.patch('/password', auth, updatePassword);

// Delete
router.delete('/me', auth, deleteUser);

export default router;
