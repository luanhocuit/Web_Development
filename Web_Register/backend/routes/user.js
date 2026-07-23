import express from 'express';
import { getUserProfile, updateUserProfile, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Get user profile
router.get('/:uid', getUserProfile);

// Update user profile
router.put('/:uid', updateUserProfile);

// Delete user
router.delete('/:uid', deleteUser);

export default router;