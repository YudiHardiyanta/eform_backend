/*
  Warnings:

  - A unique constraint covering the columns `[kode,versi]` on the table `m_desa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kode,versi]` on the table `m_kab` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kode,versi]` on the table `m_kec` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kode,versi]` on the table `m_prov` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kode,versi]` on the table `m_sls` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `m_desa` DROP FOREIGN KEY `m_desa_kode_kab_fkey`;

-- DropForeignKey
ALTER TABLE `m_desa` DROP FOREIGN KEY `m_desa_kode_kec_fkey`;

-- DropForeignKey
ALTER TABLE `m_desa` DROP FOREIGN KEY `m_desa_kode_prov_fkey`;

-- DropForeignKey
ALTER TABLE `m_kab` DROP FOREIGN KEY `m_kab_kode_prov_fkey`;

-- DropForeignKey
ALTER TABLE `m_kec` DROP FOREIGN KEY `m_kec_kode_kab_fkey`;

-- DropForeignKey
ALTER TABLE `m_kec` DROP FOREIGN KEY `m_kec_kode_prov_fkey`;

-- DropForeignKey
ALTER TABLE `m_sls` DROP FOREIGN KEY `m_sls_kode_desa_fkey`;

-- DropForeignKey
ALTER TABLE `m_sls` DROP FOREIGN KEY `m_sls_kode_kab_fkey`;

-- DropForeignKey
ALTER TABLE `m_sls` DROP FOREIGN KEY `m_sls_kode_kec_fkey`;

-- DropForeignKey
ALTER TABLE `m_sls` DROP FOREIGN KEY `m_sls_kode_prov_fkey`;

-- DropIndex
DROP INDEX `m_desa_kode_kab_fkey` ON `m_desa`;

-- DropIndex
DROP INDEX `m_desa_kode_kec_fkey` ON `m_desa`;

-- DropIndex
DROP INDEX `m_desa_kode_prov_fkey` ON `m_desa`;

-- DropIndex
DROP INDEX `m_kab_kode_prov_fkey` ON `m_kab`;

-- DropIndex
DROP INDEX `m_kec_kode_kab_fkey` ON `m_kec`;

-- DropIndex
DROP INDEX `m_kec_kode_prov_fkey` ON `m_kec`;

-- DropIndex
DROP INDEX `m_sls_kode_desa_fkey` ON `m_sls`;

-- DropIndex
DROP INDEX `m_sls_kode_kab_fkey` ON `m_sls`;

-- DropIndex
DROP INDEX `m_sls_kode_kec_fkey` ON `m_sls`;

-- DropIndex
DROP INDEX `m_sls_kode_prov_fkey` ON `m_sls`;

-- CreateIndex
CREATE UNIQUE INDEX `m_desa_kode_versi_key` ON `m_desa`(`kode`, `versi`);

-- CreateIndex
CREATE UNIQUE INDEX `m_kab_kode_versi_key` ON `m_kab`(`kode`, `versi`);

-- CreateIndex
CREATE UNIQUE INDEX `m_kec_kode_versi_key` ON `m_kec`(`kode`, `versi`);

-- CreateIndex
CREATE UNIQUE INDEX `m_prov_kode_versi_key` ON `m_prov`(`kode`, `versi`);

-- CreateIndex
CREATE UNIQUE INDEX `m_sls_kode_versi_key` ON `m_sls`(`kode`, `versi`);

-- AddForeignKey
ALTER TABLE `m_kab` ADD CONSTRAINT `m_kab_kode_prov_versi_fkey` FOREIGN KEY (`kode_prov`, `versi`) REFERENCES `m_prov`(`kode`, `versi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `m_kec` ADD CONSTRAINT `m_kec_kode_prov_versi_fkey` FOREIGN KEY (`kode_prov`, `versi`) REFERENCES `m_prov`(`kode`, `versi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `m_kec` ADD CONSTRAINT `m_kec_kode_kab_versi_fkey` FOREIGN KEY (`kode_kab`, `versi`) REFERENCES `m_kab`(`kode`, `versi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `m_desa` ADD CONSTRAINT `m_desa_kode_prov_versi_fkey` FOREIGN KEY (`kode_prov`, `versi`) REFERENCES `m_prov`(`kode`, `versi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `m_desa` ADD CONSTRAINT `m_desa_kode_kab_versi_fkey` FOREIGN KEY (`kode_kab`, `versi`) REFERENCES `m_kab`(`kode`, `versi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `m_desa` ADD CONSTRAINT `m_desa_kode_kec_versi_fkey` FOREIGN KEY (`kode_kec`, `versi`) REFERENCES `m_kec`(`kode`, `versi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `m_sls` ADD CONSTRAINT `m_sls_kode_prov_versi_fkey` FOREIGN KEY (`kode_prov`, `versi`) REFERENCES `m_prov`(`kode`, `versi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `m_sls` ADD CONSTRAINT `m_sls_kode_kab_versi_fkey` FOREIGN KEY (`kode_kab`, `versi`) REFERENCES `m_kab`(`kode`, `versi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `m_sls` ADD CONSTRAINT `m_sls_kode_kec_versi_fkey` FOREIGN KEY (`kode_kec`, `versi`) REFERENCES `m_kec`(`kode`, `versi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `m_sls` ADD CONSTRAINT `m_sls_kode_desa_versi_fkey` FOREIGN KEY (`kode_desa`, `versi`) REFERENCES `m_desa`(`kode`, `versi`) ON DELETE RESTRICT ON UPDATE CASCADE;
