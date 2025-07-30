import express from 'express';
import { login,reset_password,get,edit,reset_password_admin } from '../controller/userController.js';
import verifyToken from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/roleMiddleware.js';

const userRoutes = express.Router();

userRoutes.post('/login',login)
userRoutes.post('/reset_password',verifyToken,reset_password)

// untuk admin
userRoutes.get('/',verifyToken,isAdmin,get)
userRoutes.put('/',verifyToken,isAdmin,edit)
userRoutes.post('/reset_admin',verifyToken,isAdmin,reset_password_admin)

export default userRoutes