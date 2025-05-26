import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();  // Memuat variabel lingkungan dari file .env
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';  // Kunci rahasia untuk JWT

const prisma = new PrismaClient();

export async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: username
            },
            include: {
                userRoles: true,
            },
        })
        if (!user) {
            return res.status(401).json({ code: 401, message: 'Email atau Password salah' });
        }
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ code: 401, message: 'Email atau Password salah' });
        }

        const token = jwt.sign({
            id: user.id,
            username: user.email,
            role: user.userRoles,
            nama: user.nama
        }, SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).json({ token });

    } catch (error) {
        return res.status(500).json({
            code: 500, message: error.message
        })
    }
}