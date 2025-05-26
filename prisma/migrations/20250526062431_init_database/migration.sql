-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kegiatan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `tgl_mulai` DATETIME(3) NOT NULL,
    `tgl_selesai` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRole` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_email` VARCHAR(191) NOT NULL,
    `role` ENUM('admin', 'pengawas', 'pencacah') NOT NULL DEFAULT 'pencacah',
    `kegiatan_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SampelKegiatan` (
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
    `pencacah_email` VARCHAR(191) NULL,
    `pengawas_email` VARCHAR(191) NULL,
    `status` ENUM('draft', 'submit', 'reject', 'approve') NOT NULL DEFAULT 'draft',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnswerKegiatan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `answer` VARCHAR(191) NULL,
    `sample_kegiatan_id` INTEGER NOT NULL,
    `is_aktif` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_user_email_fkey` FOREIGN KEY (`user_email`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_kegiatan_id_fkey` FOREIGN KEY (`kegiatan_id`) REFERENCES `Kegiatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnswerKegiatan` ADD CONSTRAINT `AnswerKegiatan_sample_kegiatan_id_fkey` FOREIGN KEY (`sample_kegiatan_id`) REFERENCES `SampelKegiatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
