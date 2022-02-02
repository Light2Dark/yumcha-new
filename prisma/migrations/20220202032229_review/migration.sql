/*
  Warnings:

  - You are about to alter the column `username` on the `Yumcha` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Yumcha` MODIFY `phoneNum` VARCHAR(191) NOT NULL,
    MODIFY `username` VARCHAR(191) NOT NULL,
    MODIFY `place` VARCHAR(191) NOT NULL,
    MODIFY `seat` VARCHAR(191) NOT NULL,
    MODIFY `time` TIME NOT NULL;
