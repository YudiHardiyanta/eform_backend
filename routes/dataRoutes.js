import express from 'express';
import { getDataById,updateStatusById,saveById,getDataByIdCawi,saveByIdCawi} from '../controller/dataController.js';
import verifyToken from '../middleware/authMiddleware.js';

const dataRoutes = express.Router();

dataRoutes.get('/',verifyToken,getDataById)
dataRoutes.post('/',verifyToken,saveById)
dataRoutes.post('/verify',verifyToken,updateStatusById)

dataRoutes.get('/cawi',getDataByIdCawi)
dataRoutes.post('/cawi',saveByIdCawi)

export default dataRoutes