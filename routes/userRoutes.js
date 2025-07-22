import express from 'express';
import { login,reset_password,get } from '../controller/userController.js';
import verifyToken from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/roleMiddleware.js';

const userRoutes = express.Router();

userRoutes.post('/login',login)
userRoutes.post('/reset_password',verifyToken,reset_password)

// untuk admin
userRoutes.get('/',verifyToken,isAdmin,get)

export default userRoutes