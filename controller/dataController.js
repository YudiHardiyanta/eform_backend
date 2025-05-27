import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';

dotenv.config();  // Memuat variabel lingkungan dari file .env

const prisma = new PrismaClient();

export async function updateStatusById(req, res) {
    try {
        const id_sampel = req.body.id
        const status = req.body.status
        const sampel = await prisma.sampelKegiatan.findUnique({
            where: {
                id: parseInt(id_sampel)
            },
            include: {
                MDesa: true
            }
        })
        if (!sampel) {
            console.log('sampel tidak ketemu')
            return res.status(401).json({ code: 401, message: 'Anda tidak memiliki akses untuk pendataan ini' });
        }
        if (sampel.pengawas_email != req.user.username) {
            return res.status(401).json({ code: 401, message: 'Anda tidak memiliki akses untuk pendataan ini' });
        }
        const updated_sampel = await prisma.sampelKegiatan.update({
            where: {
                id: parseInt(id_sampel)
            },
            data: {
                status: status
            }
        });
        return res.status(200).json({
            code: 200,
            message : `Data ${sampel.MDesa.nama} sudah ${updated_sampel.status}`
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            code: 500, message: error.message
        })
    }

}

export async function getDataById(req, res) {
    try {
        const id_sampel = req.query.id
        console.log(id_sampel)
        // get data sampel
        const sampel = await prisma.sampelKegiatan.findUnique({
            where: {
                id: parseInt(id_sampel)
            },
            include: {
                MProv: true,
                MKab: true,
                MKec: true,
                MDesa: true,
                answerKegiatan: true
            }

        })
        const id_kegiatan = sampel.kegiatan_id;

        // cek user role
        const roleId = req.user.role.find(r => r.kegiatan_id == id_kegiatan);
        console.log(roleId)
        if (!roleId) {
            res.status(401).json({ code: 401, message: 'Anda tidak memiliki akses untuk pendataan ini' });
        }

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