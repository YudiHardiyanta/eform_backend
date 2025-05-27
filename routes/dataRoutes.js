import express from 'express';
import { getDataById } from '../controller/dataController.js';
import verifyToken from '../middleware/authMiddleware.js';

const dataRoutes = express.Router();

dataRoutes.get('/',verifyToken,getDataById)

export default dataRoutes