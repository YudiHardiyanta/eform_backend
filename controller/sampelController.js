import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';

dotenv.config();  // Memuat variabel lingkungan dari file .env

const prisma = new PrismaClient();

export async function getSampel(req, res) {
    try {
        const roleId = req.user.role.find(r => r.kegiatan_id == req.query.id);
        
        if (!roleId) {
            res.status(401).json({ code: 401, message: 'Anda tidak memiliki akses untuk pendataan ini' });
        }
        const whereClause = {}
        if (roleId.role == 'pencacah') {
            whereClause.pencacah_email = roleId.user_email
        }
        if (roleId.role == 'pengawas') {
            whereClause.pengawas_email = roleId.user_email
        }

        if(req.query.status!='all'){
            whereClause.status=req.query.status
        }
        const sampel = await prisma.sampelKegiatan.findMany({
            where: whereClause,
            include: {
                MProv: true,
                MKab: true,
                MKec: true,
                MDesa: true
            }
        })
        return res.status(200).json({
            code: 200,
            data: sampel,
            role: roleId.role
        })
    } catch (error) {
        return res.status(500).json({
            code: 500, message: error.message
        })
    }

}

export async function aggSampel(req, res) {
    try {
        const roleId = req.user.role.find(r => r.kegiatan_id == req.query.id);
        if (!roleId) {
            res.status(401).json({ code: 401, message: 'Anda tidak memiliki akses untuk pendataan ini' });
        }
        const whereClause = {}
        if (roleId.role == 'pencacah') {
            whereClause.pencacah_email = roleId.user_email
        }
        if (roleId.role == 'pengawas') {
            whereClause.pengawas_email = roleId.user_email
        }
        const agg = await prisma.sampelKegiatan.groupBy({
            where: whereClause,
            by: ['status'],
            _count: {
                _all: true,
            },
        })
        return res.status(200).json({
            code: 200,
            data: agg,
        })
    } catch (error) {
        return res.status(500).json({
            code: 500, message: error.message
        })
    }
}