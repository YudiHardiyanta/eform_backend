-- DropForeignKey
ALTER TABLE `tb_sampel_kegiatan` DROP FOREIGN KEY `tb_sampel_kegiatan_desa_fkey`;

-- DropForeignKey
ALTER TABLE `tb_sampel_kegiatan` DROP FOREIGN KEY `tb_sampel_kegiatan_kab_fkey`;

-- DropForeignKey
ALTER TABLE `tb_sampel_kegiatan` DROP FOREIGN KEY `tb_sampel_kegiatan_kec_fkey`;

-- DropForeignKey
ALTER TABLE `tb_sampel_kegiatan` DROP FOREIGN KEY `tb_sampel_kegiatan_prov_fkey`;

-- DropForeignKey
ALTER TABLE `tb_sampel_kegiatan` DROP FOREIGN KEY `tb_sampel_kegiatan_sls_fkey`;

-- DropIndex
DROP INDEX `m_desa_kode_key` ON `m_desa`;

-- DropIndex
DROP INDEX `m_kab_kode_key` ON `m_kab`;

-- DropIndex
DROP INDEX `m_kec_kode_key` ON `m_kec`;

-- DropIndex
DROP INDEX `m_prov_kode_key` ON `m_prov`;

-- DropIndex
DROP INDEX `m_sls_kode_key` ON `m_sls`;

-- DropIndex
DROP INDEX `tb_sampel_kegiatan_desa_fkey` ON `tb_sampel_kegiatan`;

-- DropIndex
DROP INDEX `tb_sampel_kegiatan_kab_fkey` ON `tb_sampel_kegiatan`;

-- DropIndex
DROP INDEX `tb_sampel_kegiatan_kec_fkey` ON `tb_sampel_kegiatan`;

-- DropIndex
DROP INDEX `tb_sampel_kegiatan_prov_fkey` ON `tb_sampel_kegiatan`;

-- DropIndex
DROP INDEX `tb_sampel_kegiatan_sls_fkey` ON `tb_sampel_kegiatan`;

-- AlterTable
ALTER TABLE `tb_sampel_kegiatan` ADD COLUMN `versi` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `tb_sampel_kegiatan` ADD CONSTRAINT `tb_sampel_kegiatan_prov_versi_fkey` FOREIGN KEY (`prov`, `versi`) REFERENCES `m_prov`(`kode`, `versi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_sampel_kegiatan` ADD CONSTRAINT `tb_sampel_kegiatan_kab_versi_fkey` FOREIGN KEY (`kab`, `versi`) REFERENCES `m_kab`(`kode`, `versi`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_sampel_kegiatan` ADD CONSTRAINT `tb_sampel_kegiatan_kec_versi_fkey` FOREIGN KEY (`kec`, `versi`) REFERENCES `m_kec`(`kode`, `versi`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_sampel_kegiatan` ADD CONSTRAINT `tb_sampel_kegiatan_desa_versi_fkey` FOREIGN KEY (`desa`, `versi`) REFERENCES `m_desa`(`kode`, `versi`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_sampel_kegiatan` ADD CONSTRAINT `tb_sampel_kegiatan_sls_versi_fkey` FOREIGN KEY (`sls`, `versi`) REFERENCES `m_sls`(`kode`, `versi`) ON DELETE SET NULL ON UPDATE CASCADE;
