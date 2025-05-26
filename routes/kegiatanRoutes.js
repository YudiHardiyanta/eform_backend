import express from 'express';
import { getKegiatan } from '../controller/kegiatanController.js';
import verifyToken from '../middleware/authMiddleware.js';

const kegiatanRoutes = express.Router();

kegiatanRoutes.post('/',verifyToken,getKegiatan)

export default kegiatanRoutes
