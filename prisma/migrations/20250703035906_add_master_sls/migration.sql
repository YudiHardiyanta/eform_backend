-- AlterTable
ALTER TABLE `tb_sampel_kegiatan` ADD COLUMN `mSLSId` INTEGER NULL;

-- CreateTable
CREATE TABLE `m_sls` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `kode_prov` VARCHAR(191) NOT NULL,
    `kode_kab` VARCHAR(191) NOT NULL,
    `kode_kec` VARCHAR(191) NOT NULL,
    `kode_desa` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `m_sls_kode_key`(`kode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `m_sls` ADD CONSTRAINT `m_sls_kode_prov_fkey` FOREIGN KEY (`kode_prov`) REFERENCES `m_prov`(`kode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `m_sls` ADD CONSTRAINT `m_sls_kode_kab_fkey` FOREIGN KEY (`kode_kab`) REFERENCES `m_kab`(`kode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `m_sls` ADD CONSTRAINT `m_sls_kode_kec_fkey` FOREIGN KEY (`kode_kec`) REFERENCES `m_kec`(`kode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `m_sls` ADD CONSTRAINT `m_sls_kode_desa_fkey` FOREIGN KEY (`kode_desa`) REFERENCES `m_desa`(`kode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_sampel_kegiatan` ADD CONSTRAINT `tb_sampel_kegiatan_mSLSId_fkey` FOREIGN KEY (`mSLSId`) REFERENCES `m_sls`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
