-- AlterTable
ALTER TABLE `tb_kegiatan` ADD COLUMN `pencacah_edit` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `pengawas_approve` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `pengawas_edit` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `table_header` JSON NULL,
    ADD COLUMN `table_var` JSON NULL,
    ADD COLUMN `wilayah_kecil` ENUM('prov', 'kab', 'kec', 'desa', 'sls', 'subsls', 'bs') NOT NULL DEFAULT 'subsls';
