-- AlterTable
ALTER TABLE `tb_sampel_kegiatan` MODIFY `status` ENUM('open', 'draft', 'submit', 'reject', 'approve') NOT NULL DEFAULT 'open';
