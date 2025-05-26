import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();  // Memuat variabel lingkungan dari file .env
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';  // Kunci rahasia untuk JWT



// Middleware untuk memverifikasi JWT
const verifyToken = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];  // Mengambil token dari header Authorization
    if (!token) {
        return res.status(403).json({ message: 'Access denied' });
    }
    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified; // Menyimpan informasi user yang terverifikasi
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

export default verifyToken