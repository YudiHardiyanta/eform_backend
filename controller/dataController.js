import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';

dotenv.config();  // Memuat variabel lingkungan dari file .env

const prisma = new PrismaClient();

export async function getDataById(req, res) {
    try {
        const id_sampel = req.query.id
        console.log(id_sampel)
        // get data sampel
        const sampel = await prisma.sampelKegiatan.findUnique({
            where: {
                id : parseInt(id_sampel)
            },
            include : {
                MProv : true,
                MKab : true,
                MKec : true,
                MDesa : true,
                answerKegiatan : true
            }
            
        })
        const id_kegiatan = sampel.kegiatan_id;
        
        // cek user role
        const roleId = req.user.role.find(r => r.kegiatan_id == id_kegiatan);
        console.log(req.user)
        if (!roleId) {
            res.status(401).json({ code: 401, message: 'Anda tidak memiliki akses untuk pendataan ini' });
        }
        
        return res.status(200).json({
            code: 200,
            data: sampel,
            role : roleId.role
        })

    } catch (error) {
        return res.status(500).json({
            code: 500, message: error.message
        })
    }
    
    

    
}