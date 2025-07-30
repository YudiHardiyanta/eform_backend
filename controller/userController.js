import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();  // Memuat variabel lingkungan dari file .env
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';  // Kunci rahasia untuk JWT

const prisma = new PrismaClient();

export async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: username
            },
            include: {
                userRoles: true,
            },
        })
        if (!user) {
            return res.status(401).json({ code: 401, message: 'Email atau Password salah' });
        }
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ code: 401, message: 'Email atau Password salah' });
        }

        const token = jwt.sign({
            id: user.id,
            username: user.email,
            role_utama: user.role,
            role: user.userRoles,
            nama: user.nama
        }, SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).json({ token });

    } catch (error) {
        return res.status(500).json({
            code: 500, message: error.message
        })
    }
}

export async function reset_password(req, res) {
    const { password_lama, password_baru } = req.body;
    const user_login = req.user
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: user_login.username
            },
            include: {
                userRoles: true,
            },
        })
        const isMatch = await compare(password_lama, user.password);
        if (!isMatch) {
            return res.status(401).json({ code: 401, message: 'Password lama salah' });
        }

        const hashedPassword = await hash(password_baru, 10);

        const updated_user = await prisma.user.update({
            where: {
                email: user_login.username
            },
            data: {
                password: hashedPassword,
            }
        });
        return res.status(200).json({ code: 200, message: 'password sudah berhasil diganti' });

    } catch (error) {

        return res.status(500).json({
            code: 500, message: error.message
        })
    }
}

export async function reset_password_admin(req, res) {
    try {
        const { email, reset_pass } = req.body;
        const hashedPassword = await hash(reset_pass, 10);
        const user = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                password: hashedPassword,
            }
        })

        return res.status(200).json({ code: 200, message: 'password sudah berhasil diganti' });
    } catch (error) {
        return res.status(500).json({
            code: 500, message: error.message
        })
    }
}

export async function get(req, res) {
    try {
        const user_login = req.user
        if (user_login.role_utama == 'admin' && !req.query['username']) {
            const user = await prisma.user.findUnique({
                where: {
                    email: user_login.username
                },
                include: {
                    userRoles: true,
                },
            })
            if (req.query['kegiatan_id']) {
                const whereClause = {}
                whereClause.kegiatan_id = parseInt(req.query['kegiatan_id'])
                if (req.query['role']) {
                    whereClause.role = req.query['role']
                }
                if (user.satker != '5100') {
                    whereClause.User={}
                    whereClause.User.satker = user['satker']
                }
                if (user.satker != '5100') {
                    const userGet = await prisma.userRole.findMany({
                        include: {
                            User: {
                                select: {
                                    nama: true,
                                    email: true,
                                },
                                
                            }
                        },
                        where: whereClause
                    })
                    return res.status(200).json({
                        code: 200, data: userGet
                    })
                } else {
                    const userGet = await prisma.userRole.findMany({
                        include: {
                            User: {
                                select: {
                                    nama: true,
                                    email: true,
                                },
                            }
                        },
                        where: whereClause
                    })
                    return res.status(200).json({
                        code: 200, data: userGet
                    })

                }


            }
            if (user.satker == '5100') {
                //get semua
                const userGet = await prisma.user.findMany({
                    select: {
                        nama: true,
                        email: true,
                        satker: true,
                        role: true
                    }
                })
                return res.status(200).json({
                    code: 200, data: userGet
                })
            } else {
                const userGet = await prisma.user.findMany({
                    where: {
                        satker: user.satker
                    },
                    select: {
                        nama: true,
                        email: true,
                        satker: true,
                        role: true
                    }
                })
                return res.status(200).json({
                    code: 200, data: userGet
                })

            }
        } else {
            const user = await prisma.user.findUnique({
                where: {
                    email: req.query['username']
                },
                select: {
                    nama: true,
                    email: true,
                    role: true,
                    satker: true,
                    userRoles: {
                        include: {
                            Kegiatan: {
                                select: {
                                    nama: true
                                }
                            },
                        },
                    }
                },
            })
            return res.status(200).json({
                code: 200, data: user
            })
        }

    } catch (error) {
        //get keseluruhan

        return res.status(500).json({
            code: 500, message: error.message
        })


    }
}

export async function edit(req, res) {
    const { email_user, nama_user, role_user, item_roles } = req.body;
    try {
        const user = await prisma.user.update({
            where: {
                email: email_user
            },
            data: {
                nama: nama_user,
                role: role_user
            },
        })
        //loop user roles
        await Promise.all(item_roles.map(role =>
            prisma.userRole.update({
                where: {
                    id: role.id
                },
                data: {
                    role: role.role
                }
            })
        ))

        return res.status(200).json({ code: 200, message: 'user an ' + nama_user + ' telah diubah' });
    } catch (error) {
        return res.status(500).json({
            code: 500, message: error.message
        })
    }
}