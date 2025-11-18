import express from 'express';
import {
    createUser,
    getUserById,
    updateUserEmail,
    updateUserName,
    updateUserPassword
} from '../controllers/usersController.js';
import {auth} from "../middlewares/auth.js";

const router = express.Router();

// Create
router.post('/', createUser);

// Get
router.get('/:id', auth, getUserById);

// Update
router.patch('/email', auth, updateUserEmail);
router.patch('/name', auth, updateUserName)
router.patch('/password', auth, updateUserPassword);

export default router;