import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';

dotenv.config();  // Memuat variabel lingkungan dari file .env

const prisma = new PrismaClient();

export async function getKegiatan(req, res) {
    const  username  = req.user.username;
    if(!username){
        return res.status(401).json({
            code: 401, message: 'silakan login kembali'
        })
    }
    try {
        //mendapatkan role ke user
        const kegiatan = await prisma.userRole.findMany({
            where : {user_email : username},
            include : {
                Kegiatan : true
            }
        })
        return res.status(200).json({
            code : 200, data : kegiatan
        })
    } catch (error) {
        return res.status(500).json({
            code: 500, message: error.message
        })
    }
}