import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validateRegisterData, validateLoginData } from '../middleware/validation.js';

const router = express.Router();

// Register route
router.post('/register', validateRegisterData, register);

// Login route
router.post('/login', validateLoginData, login);

export default router;