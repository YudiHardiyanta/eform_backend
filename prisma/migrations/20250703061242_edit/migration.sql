/*
  Warnings:

  - You are about to drop the column `mSLSId` on the `tb_sampel_kegiatan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `tb_sampel_kegiatan` DROP FOREIGN KEY `tb_sampel_kegiatan_mSLSId_fkey`;

-- DropIndex
DROP INDEX `tb_sampel_kegiatan_mSLSId_fkey` ON `tb_sampel_kegiatan`;

-- AlterTable
ALTER TABLE `tb_sampel_kegiatan` DROP COLUMN `mSLSId`;

-- AddForeignKey
ALTER TABLE `tb_sampel_kegiatan` ADD CONSTRAINT `tb_sampel_kegiatan_sls_fkey` FOREIGN KEY (`sls`) REFERENCES `m_sls`(`kode`) ON DELETE SET NULL ON UPDATE CASCADE;
