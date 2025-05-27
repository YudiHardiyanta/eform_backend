-- CreateTable
CREATE TABLE `m_prov` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `m_prov_kode_key`(`kode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `m_kab` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `kode_prov` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `m_kab_kode_key`(`kode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `m_kec` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `kode_prov` VARCHAR(191) NOT NULL,
    `kode_kab` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `m_kec_kode_key`(`kode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `m_desa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `kode_prov` VARCHAR(191) NOT NULL,
    `kode_kab` VARCHAR(191) NOT NULL,
    `kode_kec` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `m_desa_kode_key`(`kode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tb_users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_kegiatan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `tgl_mulai` DATETIME(3) NOT NULL,
    `tgl_selesai` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_user_role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_email` VARCHAR(191) NOT NULL,
    `role` ENUM('admin', 'pengawas', 'pencacah') NOT NULL DEFAULT 'pencacah',
    `kegiatan_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_sampel_kegiatan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prov` VARCHAR(191) NOT NULL,
    `kab` VARCHAR(191) NULL,
    `kec` VARCHAR(191) NULL,
    `desa` VARCHAR(191) NULL,
    `sls` VARCHAR(191) NULL,
    `subsls` VARCHAR(191) NULL,
    `bs` VARCHAR(191) NULL,
    `wilayah_id` VARCHAR(191) NOT NULL,
    `kegiatan_id` VARCHAR(191) NOT NULL,
    `predifined_data` JSON NULL,
    `pencacah_email` VARCHAR(191) NULL,
    `pengawas_email` VARCHAR(191) NULL,
    `status` ENUM('draft', 'submit', 'reject', 'approve') NOT NULL DEFAULT 'draft',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_answer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `answer` JSON NULL,
    `sample_kegiatan_id` INTEGER NOT NULL,
    `is_aktif` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `m_kab` ADD CONSTRAINT `m_kab_kode_prov_fkey` FOREIGN KEY (`kode_prov`) REFERENCES `m_prov`(`kode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `m_kec` ADD CONSTRAINT `m_kec_kode_prov_fkey` FOREIGN KEY (`kode_prov`) REFERENCES `m_prov`(`kode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `m_kec` ADD CONSTRAINT `m_kec_kode_kab_fkey` FOREIGN KEY (`kode_kab`) REFERENCES `m_kab`(`kode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `m_desa` ADD CONSTRAINT `m_desa_kode_prov_fkey` FOREIGN KEY (`kode_prov`) REFERENCES `m_prov`(`kode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `m_desa` ADD CONSTRAINT `m_desa_kode_kab_fkey` FOREIGN KEY (`kode_kab`) REFERENCES `m_kab`(`kode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `m_desa` ADD CONSTRAINT `m_desa_kode_kec_fkey` FOREIGN KEY (`kode_kec`) REFERENCES `m_kec`(`kode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_user_role` ADD CONSTRAINT `tb_user_role_user_email_fkey` FOREIGN KEY (`user_email`) REFERENCES `tb_users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_user_role` ADD CONSTRAINT `tb_user_role_kegiatan_id_fkey` FOREIGN KEY (`kegiatan_id`) REFERENCES `tb_kegiatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_sampel_kegiatan` ADD CONSTRAINT `tb_sampel_kegiatan_prov_fkey` FOREIGN KEY (`prov`) REFERENCES `m_prov`(`kode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_sampel_kegiatan` ADD CONSTRAINT `tb_sampel_kegiatan_kab_fkey` FOREIGN KEY (`kab`) REFERENCES `m_kab`(`kode`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_sampel_kegiatan` ADD CONSTRAINT `tb_sampel_kegiatan_kec_fkey` FOREIGN KEY (`kec`) REFERENCES `m_kec`(`kode`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_sampel_kegiatan` ADD CONSTRAINT `tb_sampel_kegiatan_desa_fkey` FOREIGN KEY (`desa`) REFERENCES `m_desa`(`kode`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_answer` ADD CONSTRAINT `tb_answer_sample_kegiatan_id_fkey` FOREIGN KEY (`sample_kegiatan_id`) REFERENCES `tb_sampel_kegiatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
