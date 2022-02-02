/*
  Warnings:

  - Added the required column `date` to the `Yumcha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Yumcha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place` to the `Yumcha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sameGender` to the `Yumcha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seat` to the `Yumcha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Yumcha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Yumcha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yumchaName` to the `Yumcha` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Yumcha` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `date` DATE NOT NULL,
    ADD COLUMN `description` MEDIUMTEXT NOT NULL,
    ADD COLUMN `place` TEXT NOT NULL,
    ADD COLUMN `sameGender` BOOLEAN NOT NULL,
    ADD COLUMN `seat` TEXT NOT NULL,
    ADD COLUMN `time` TIME NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `yumchaName` TEXT NOT NULL;
