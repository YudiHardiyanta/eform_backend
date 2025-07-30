import express from 'express';
import { getSampel,aggSampel,editSampel } from '../controller/sampelController.js';
import verifyToken from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/roleMiddleware.js';

const sampelRoutes = express.Router();

sampelRoutes.get('/',verifyToken,getSampel)
sampelRoutes.get('/agg',verifyToken,aggSampel)

// untuk admin
sampelRoutes.put('/',verifyToken,isAdmin,editSampel)

export default sampelRoutes