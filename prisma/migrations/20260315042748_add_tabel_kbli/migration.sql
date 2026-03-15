-- CreateTable
CREATE TABLE `m_kbli` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kbli_kode` VARCHAR(191) NOT NULL,
    `kbli_kategori` VARCHAR(191) NOT NULL,
    `kbli_deskripsi` VARCHAR(191) NOT NULL,
    `kbli_keterangan` TEXT NOT NULL,
    `versi` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
