import express from 'express';
import { getKegiatan } from '../controller/kegiatanController.js';
import verifyToken from '../middleware/authMiddleware.js';

const kegiatanRoutes = express.Router();

kegiatanRoutes.get('/',verifyToken,getKegiatan)

export default kegiatanRoutes
