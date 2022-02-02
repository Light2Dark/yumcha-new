/*
  Warnings:

  - You are about to drop the column `date` on the `Yumcha` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Yumcha` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Yumcha` DROP COLUMN `date`,
    DROP COLUMN `time`;
