import express from 'express';
import { getDataById,updateStatusById,saveById} from '../controller/dataController.js';
import verifyToken from '../middleware/authMiddleware.js';

const dataRoutes = express.Router();

dataRoutes.get('/',verifyToken,getDataById)
dataRoutes.post('/',verifyToken,saveById)
dataRoutes.post('/verify',verifyToken,updateStatusById)

export default dataRoutes