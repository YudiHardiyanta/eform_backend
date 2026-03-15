import express from 'express';
import { getKBLI} from '../controller/klasifikasiController.js'
import verifyToken from '../middleware/authMiddleware.js';

const klasifikasiRoutes = express.Router();

klasifikasiRoutes.get('/kbli',getKBLI)

export default klasifikasiRoutes