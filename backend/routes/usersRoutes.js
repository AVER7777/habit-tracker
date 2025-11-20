import express from 'express';

import {
    deleteUser,
    getUser,
    updateUserEmail,
    updateUserName,
    updateUserPassword,
} from '../controllers/usersController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

// Get
router.get('/me', auth, getUser);

// Update
router.patch('/email', auth, updateUserEmail);
router.patch('/name', auth, updateUserName);
router.patch('/password', auth, updateUserPassword);

// Delete
router.delete('/me', auth, deleteUser);

export default router;
