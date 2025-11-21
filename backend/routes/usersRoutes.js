import express from 'express';

import {
    deleteUser,
    getUser,
    updateEmail,
    updateName,
    updatePassword,
} from '../controllers/usersController.js';
import { auth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import {
    updateEmailSchema,
    updateNameSchema,
    updatePasswordSchema,
} from '../schemas/userSchema.js';

const router = express.Router();

// Get
router.get('/me', auth, getUser);

// Update
router.patch('/email', auth, validate(updateEmailSchema), updateEmail);
router.patch('/name', auth, validate(updateNameSchema), updateName);
router.patch('/password', auth, validate(updatePasswordSchema), updatePassword);

// Delete
router.delete('/me', auth, deleteUser);

export default router;
