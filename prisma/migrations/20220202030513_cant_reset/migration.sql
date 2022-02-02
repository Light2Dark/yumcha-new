/*
  Warnings:

  - You are about to drop the column `date` on the `Yumcha` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Yumcha` table. All the data in the column will be lost.
  - You are about to drop the column `place` on the `Yumcha` table. All the data in the column will be lost.
  - You are about to drop the column `sameGender` on the `Yumcha` table. All the data in the column will be lost.
  - You are about to drop the column `seat` on the `Yumcha` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Yumcha` table. All the data in the column will be lost.
  - You are about to drop the column `yumchaName` on the `Yumcha` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Yumcha` DROP COLUMN `date`,
    DROP COLUMN `description`,
    DROP COLUMN `place`,
    DROP COLUMN `sameGender`,
    DROP COLUMN `seat`,
    DROP COLUMN `time`,
    DROP COLUMN `yumchaName`;
