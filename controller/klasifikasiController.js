import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';

dotenv.config();  // Memuat variabel lingkungan dari file .env

const prisma = new PrismaClient();

export async function getKBLI(req, res) {
    try {
        const versi = req.query.versi;
        const search = req.query.search || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const data = await prisma.KBLI.findMany({
            where: {
                OR: [
                    {
                        kbli_kode: {
                            contains: search
                        }
                    },
                    {
                        kbli_deskripsi: {
                            contains: search,
                        }
                    },
                    {
                        kbli_kategori: {
                            contains: search,
                        }
                    }
                ],
                versi : versi,
            },
            skip: skip,
            take: limit
        });

        const total = await prisma.KBLI.count({
            where: {
                OR: [
                    { kbli_kode: { contains: search } },
                    { kbli_deskripsi: { contains: search,} },
                    { kbli_kategori: { contains: search, } }
                ],
                versi : versi,
            }
        });

        return res.status(200).json({
            code: 200,
            page: page,
            limit: limit,
            total: total,
            totalPages: Math.ceil(total / limit),
            data: data
        });
    } catch (error) {
        return res.status(500).json({
            code: 500, message: error.message
        })
    }
}