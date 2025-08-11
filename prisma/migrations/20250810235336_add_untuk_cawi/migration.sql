-- AlterTable
ALTER TABLE `tb_sampel_kegiatan` ADD COLUMN `moda_utama` ENUM('cawi', 'capi') NULL DEFAULT 'capi',
    ADD COLUMN `token` TEXT NULL;

-- CreateTable
CREATE TABLE `m_list_usaha` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telepon` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_email_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sample_kegiatan_id` INTEGER NOT NULL,
    `to` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `m_email_format` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kegiatan_id` INTEGER NOT NULL,
    `body_html` VARCHAR(191) NOT NULL,
    `attachments` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
