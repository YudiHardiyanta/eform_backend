import { PrismaClient } from "@prisma/client";
import { compare,hash } from "bcrypt";
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

export async function reset_password(req, res) {
    const { password_lama, password_baru } = req.body;
    console.log(password_lama)
    const user_login = req.user
    console.log(req.user)
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: user_login.username
            },
            include: {
                userRoles: true,
            },
        })
        const isMatch = await compare(password_lama, user.password);
        if (!isMatch) {
            return res.status(401).json({ code: 401, message: 'Password lama salah' });
        }

        const hashedPassword = await hash(password_baru, 10);

        const updated_user = await prisma.user.update({
            where: {
                email: user_login.username
            },
            data: {
                password: hashedPassword,
            }
        });
        return res.status(200).json({ code:200,message : 'password sudah berhasil diganti' });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            code: 500, message: error.message
        })
    }
}