-- AlterTable
ALTER TABLE `tb_answer` ADD COLUMN `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `tb_sampel_kegiatan` ADD COLUMN `nama` VARCHAR(191) NULL;
