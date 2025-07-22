-- AlterTable
ALTER TABLE `tb_user_role` MODIFY `role` ENUM('admin', 'pengawas', 'pencacah', 'user') NOT NULL DEFAULT 'pencacah';

-- AlterTable
ALTER TABLE `tb_users` ADD COLUMN `role` ENUM('admin', 'pengawas', 'pencacah', 'user') NOT NULL DEFAULT 'user';
