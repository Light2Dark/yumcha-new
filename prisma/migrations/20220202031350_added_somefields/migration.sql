/*
  Warnings:

  - Added the required column `date` to the `Yumcha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place` to the `Yumcha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seat` to the `Yumcha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Yumcha` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Yumcha` ADD COLUMN `date` DATE NOT NULL,
    ADD COLUMN `place` TEXT NOT NULL,
    ADD COLUMN `seat` TEXT NOT NULL,
    ADD COLUMN `time` TIME NOT NULL;
