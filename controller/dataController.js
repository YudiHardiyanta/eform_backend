import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';

dotenv.config();  // Memuat variabel lingkungan dari file .env

const prisma = new PrismaClient();

export async function saveById(req, res) {
    try {
        const id_sampel = req.body.id
        const status = req.body.status
        const data = req.body.data
        const catatan = req.body.catatan
        const sampel = await prisma.sampelKegiatan.findUnique({
            where: {
                id: parseInt(id_sampel)
            },
            include: {
                MDesa: true
            }
        })
        if (!sampel) {
            return res.status(401).json({ code: 401, message: 'Anda tidak memiliki akses untuk pendataan ini' });
        }
        if (sampel.pencacah_email != req.user.username) {
            return res.status(401).json({ code: 401, message: 'Anda tidak memiliki akses untuk pendataan ini' });
        }

        const updated_sampel = await prisma.sampelKegiatan.update({
            where: {
                id: parseInt(id_sampel)
            },
            data: {
                status: status,
                catatan : catatan
            }
        });

        const updateAnswer = await prisma.answerKegiatan.updateMany({
            where: {
                sample_kegiatan_id: parseInt(id_sampel)
            },
            data: {
                is_aktif: false
            }
        });

        const addNewAnswer = await prisma.answerKegiatan.create({
            data : {
                sample_kegiatan_id : parseInt(id_sampel),
                answer : data,
                is_aktif : true
            }
        })

        return res.status(200).json({
            code: 200,
            message: `Data ${sampel.MDesa.nama} sudah ${updated_sampel.status}`
        })

    } catch (error) {
        return res.status(500).json({
            code: 500, message: error.message
        })
    }

}

export async function updateStatusById(req, res) {
    try {
        const id_sampel = req.body.id
        const status = req.body.status
        const catatan = req.body.catatan
        const sampel = await prisma.sampelKegiatan.findUnique({
            where: {
                id: parseInt(id_sampel)
            },
            include: {
                MDesa: true
            }
        })
        if (!sampel) {
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
                status: status,
                catatan : catatan
            }
        });

        


        return res.status(200).json({
            code: 200,
            message: `Data ${sampel.MDesa.nama} sudah ${updated_sampel.status}`
        })
    } catch (error) {
        return res.status(500).json({
            code: 500, message: error.message
        })
    }

}

export async function getDataById(req, res) {
    try {
        const id_sampel = req.query.id
        // get data sampel
        const sampel = await prisma.sampelKegiatan.findUnique({
            where: {
                id: parseInt(id_sampel)
            },
            include: {
                MProv: {
                    select : {
                        kode : true,
                        nama : true
                    }
                },
                MKab: {
                    select : {
                        kode : true,
                        nama : true
                    }
                },
                MKec: {
                    select : {
                        kode : true,
                        nama : true
                    }
                },
                MDesa: {
                    select : {
                        kode : true,
                        nama : true
                    }
                },
                answerKegiatan: {
                    where : {
                        is_aktif : true
                    }
                }
            }

        })
        const id_kegiatan = sampel.kegiatan_id;

        // cek user role
        const roleId = req.user.role.find(r => r.kegiatan_id == id_kegiatan);
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