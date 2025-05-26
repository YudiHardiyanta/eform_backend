import express from 'express';
import { login } from '../controller/userController.js';

const userRoutes = express.Router();

userRoutes.post('/login',login)

export default userRoutes