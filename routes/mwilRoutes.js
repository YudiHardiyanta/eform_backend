import express from 'express';
import { getMasterWilayah} from '../controller/mwilController.js';
import verifyToken from '../middleware/authMiddleware.js';

const mwilRoutes = express.Router();

mwilRoutes.get('/',getMasterWilayah)

export default mwilRoutes