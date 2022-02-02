/*
  Warnings:

  - You are about to drop the column `message` on the `Yumcha` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Yumcha` table. All the data in the column will be lost.
  - Added the required column `date` to the `Yumcha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Yumcha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNum` to the `Yumcha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place` to the `Yumcha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sameGender` to the `Yumcha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seat` to the `Yumcha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Yumcha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Yumcha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yumchaName` to the `Yumcha` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Yumcha` DROP COLUMN `message`,
    DROP COLUMN `name`,
    ADD COLUMN `date` DATE NOT NULL,
    ADD COLUMN `description` MEDIUMTEXT NOT NULL,
    ADD COLUMN `phoneNum` TEXT NOT NULL,
    ADD COLUMN `place` TEXT NOT NULL,
    ADD COLUMN `sameGender` BOOLEAN NOT NULL,
    ADD COLUMN `seat` TEXT NOT NULL,
    ADD COLUMN `time` TIME NOT NULL,
    ADD COLUMN `username` VARCHAR(255) NOT NULL,
    ADD COLUMN `yumchaName` TEXT NOT NULL;
