import express from 'express';
import { getSampel,aggSampel } from '../controller/sampelController.js';
import verifyToken from '../middleware/authMiddleware.js';

const sampelRoutes = express.Router();

sampelRoutes.get('/',verifyToken,getSampel)
sampelRoutes.get('/agg',verifyToken,aggSampel)

export default sampelRoutes