import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import Handlebars from "handlebars";

dotenv.config();  // Memuat variabel lingkungan dari file .env

const prisma = new PrismaClient();

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.bps.go.id',     // ganti dengan host Zimbra kamu
    port: 587,                  // atau 465 untuk SSL
    secure: false,              // true jika port 465
    auth: {
        user: 'kasiedls5100@bps.go.id',
        pass: 'dls5100'
    },
    tls: {
        rejectUnauthorized: false // gunakan jika self-signed cert
    }
});



export async function kirimEmail(req, res) {
    try {
        const id_sampel = req.body.id
        const email = req.body.email
        const ganti_token = req.body.ganti_token
        const token = uuidv4();

        if (ganti_token) {
            const update_sampel = await prisma.sampelKegiatan.update({
                where: {
                    id: id_sampel
                },
                data: {
                    token: token
                }
            })
        }
        const sampel = await prisma.sampelKegiatan.findUnique({
            where: {
                id: id_sampel
            }
        })
        if (!sampel) {
            res.status(401).json({ code: 401, message: 'Anda tidak memiliki akses untuk pendataan ini' });
        }
        const email_format = await prisma.emailFormat.findFirst({
            where: {
                kegiatan_id: parseInt(sampel.kegiatan_id)
            }
        })

        const kegiatan = await prisma.kegiatan.findUnique({
            where: {
                id: parseInt(sampel.kegiatan_id)
            }
        })
        const body_email = email_format.body_html
        const template = Handlebars.compile(body_email);

        const unik_link = process.env.APP_URL + kegiatan.path_cawi + '?id=' + sampel.id + '&token=' + sampel.token

        const result = template({ subject: kegiatan.nama, nama: sampel.nama, unik_link: unik_link });
        const text = "Silakan Akses " + kegiatan.nama + " pada link berikut : " + unik_link
        const attachment = email_format.attachments

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: kegiatan.nama,
            attachments: attachment,
            text: text, // belum diatur
            html: result

        };
        const addHistoryEmail = await prisma.emailHistory.create({
            data: {
                sample_kegiatan_id: sampel.id,
                status: false,
                to: email
            }
        })

        try {
            const info = await transporter.sendMail(mailOptions);
            const updateEmail = await prisma.emailHistory.update({
                where: {
                    id: addHistoryEmail.id
                },
                data: {
                    status: true
                }
            })
            return res.status(200).json({
                code: 200,
                message: 'Email Berhasil Terkirim, '+info.response
            })
            //console.log('✅ Email terkirim:', info.response);
        } catch (err) {
            return res.status(401).json({
                code: 401,
                message: err
            })
        }



    } catch (error) {
        return res.status(500).json({
            code: 500, message: error.message
        })
    }
}


/*
try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email terkirim:', info.response);
} catch (err) {
    console.error('❌ Gagal kirim email:', err);
}
// Jalankan fungsi kirim email saat file dieksekusi langsung
console.log('tes')
*/