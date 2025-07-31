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
        whereClause.kegiatan_id = req.query.id
        if (req.query.status != 'all') {
            whereClause.status = req.query.status
        }
        //console.log(req.user)
        if (req.user.role_utama =='admin' && req.user.satker!="5100"){
            whereClause.kab = req.user.satker
        }
        const sampel = await prisma.sampelKegiatan.findMany({
            where: whereClause,
            include: {
                MProv: {
                    select: {
                        kode: true,
                        nama: true
                    }
                },
                MKab: {
                    select: {
                        kode: true,
                        nama: true
                    }
                },
                MKec: {
                    select: {
                        kode: true,
                        nama: true
                    }
                },
                MDesa: {
                    select: {
                        kode: true,
                        nama: true
                    }
                },
                MSLS: {
                    select: {
                        kode: true,
                        nama: true
                    }
                },
            }
        })

        const kegiatan = await prisma.kegiatan.findUnique({
            where: {
                id: parseInt(req.query.id)
            },
            select: {
                pencacah_edit: true,
                pengawas_edit: true,
                pengawas_approve: true,
                wilayah_kecil: true,
                table_header: true,
                path: true,
            }
        })
        return res.status(200).json({
            code: 200,
            data: sampel,
            role: roleId.role,
            config: kegiatan
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
        if (req.user.role_utama =='admin' && req.user.satker!="5100"){
            whereClause.kab = req.user.satker
        }
        whereClause.kegiatan_id = req.query.id
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

export async function editSampel(req, res) {
    try {
        const {kode_wilayah,nama_wilayah,pencacah,pengawas,id} = req.body
        const sampel = await prisma.sampelKegiatan.update({
            where : {
                id : parseInt(id)
            },
            data : {
                nama : nama_wilayah,
                pencacah_email : pencacah,
                pengawas_email : pengawas
            }
        })
        return res.status(200).json({ code: 200, message: 'Sampel '+kode_wilayah+' telah diubah' });
    } catch (error) {
        return res.status(500).json({
            code: 500, message: error.message
        })
    }
}
