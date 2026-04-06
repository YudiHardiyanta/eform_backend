import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import Handlebars from "handlebars";

import cliProgress from 'cli-progress';

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
dotenv.config();  // Memuat variabel lingkungan dari file .env

const prisma = new PrismaClient();

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.bps.go.id',     // ganti dengan host Zimbra kamu
    port: 587,                  // atau 465 untuk SSL
    secure: false,              // true jika port 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // gunakan jika self-signed cert
    }
});

async function kirimEmail(sampel) {
    try {
        const email = sampel.email
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
        } catch (err) {
            console.log(err)
        }



    } catch (error) {
        console.error('Error occurred while sending email:', error.message);
    }
}

const kegiatan_id = process.argv[2]
const sampel = await prisma.sampelKegiatan.findMany({
    where: {
        kegiatan_id: kegiatan_id
    }
})

console.log('Blasting Email Kegiatan ID:', kegiatan_id)
const total = sampel.length;

bar.start(total, 0);
let i = 0;

for (let i = 0; i < total; i++) {
    const item = sampel[i];

    // 🔧 proses kamu di sini
    await kirimEmail(item);

    // update progress
    bar.update(i + 1);
}

bar.stop();
console.log('Selesai!');