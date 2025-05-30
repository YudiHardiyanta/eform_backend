/*
  Warnings:

  - You are about to drop the column `catatan` on the `tb_answer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tb_answer` DROP COLUMN `catatan`;

-- AlterTable
ALTER TABLE `tb_sampel_kegiatan` ADD COLUMN `catatan` TEXT NULL;
