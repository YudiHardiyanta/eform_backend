import express from 'express';
import { getSampel } from '../controller/sampelController.js';
import verifyToken from '../middleware/authMiddleware.js';

const sampelRoutes = express.Router();

sampelRoutes.get('/',verifyToken,getSampel)

export default sampelRoutes