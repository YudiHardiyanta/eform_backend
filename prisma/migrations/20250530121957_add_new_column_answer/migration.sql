-- AlterTable
ALTER TABLE `tb_answer` ADD COLUMN `catatan` TEXT NULL;

-- CreateTable
CREATE TABLE `tb_notif` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `from` VARCHAR(191) NOT NULL,
    `to` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `kegiatan_id` INTEGER NOT NULL,
    `is_open` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
