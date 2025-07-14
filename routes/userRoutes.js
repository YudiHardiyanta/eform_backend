import express from 'express';
import { login,reset_password } from '../controller/userController.js';
import verifyToken from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.post('/login',login)
userRoutes.post('/reset_password',verifyToken,reset_password)

export default userRoutes