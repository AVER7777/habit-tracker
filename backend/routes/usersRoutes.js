import express from 'express';

import {
    deleteUser,
    getUser,
    updateUserEmail,
    updateUserName,
    updateUserPassword,
} from '../controllers/usersController.js';
import { auth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import {
    updateUserEmailSchema,
    updateUserNameSchema,
    updateUserPasswordSchema,
} from '../schemas/userSchema.js';

const router = express.Router();

// Get
router.get('/me', auth, getUser);

// Update
router.patch('/email', auth, validate(updateUserEmailSchema), updateUserEmail);
router.patch('/name', auth, validate(updateUserNameSchema), updateUserName);
router.patch('/password', auth, validate(updateUserPasswordSchema), updateUserPassword);

// Delete
router.delete('/me', auth, deleteUser);

export default router;
