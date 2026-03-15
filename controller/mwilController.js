import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';

dotenv.config();  // Memuat variabel lingkungan dari file .env

const prisma = new PrismaClient();

export async function getMasterWilayah(req, res) {
    try {
        const versi = req.query.version;
        const level = req.query.level;// 1 Prov -> 5 SLS
        const filter = req.query.filter;
        const whereClause = {}

        if (!level || !versi) {
            return res.status(200).json({
                code: 401,
                message: 'Level and Version are required.'
            })
        }
        if (filter) {
            if (filter.length == 2) {
                whereClause.kode_prov = filter
            }
            if (filter.length == 4) {
                whereClause.kode_kab = filter
            }
            if (filter.length == 7) {
                whereClause.kode_kec = filter
            }
            if (filter.length == 10) {
                whereClause.kode_desa = filter
            }
        }
        whereClause.versi = versi
        console.log(whereClause)
        let mwil = null;
        if (level == '1') { // get master provinsi
            mwil = await prisma.MProv.findMany({
                where: whereClause
            })
        }
        if (level == '2') { // get master provinsi
            mwil = await prisma.MKab.findMany({
                where: whereClause
            })
        }
        if (level == '3') { // get master provinsi
            mwil = await prisma.MKec.findMany({
                where: whereClause
            })
        }
        if (level == '4') { // get master provinsi
            mwil = await prisma.MDesa.findMany({
                where: whereClause
            })
        }
        if (level == '5') { // get master provinsi
            mwil = await prisma.MSLS.findMany({
                where: whereClause
            })
        }

        return res.status(200).json({
            code: 200,
            data: mwil
        })
    } catch (error) {
        return res.status(500).json({
            code: 500, message: error.message
        })
    }

}