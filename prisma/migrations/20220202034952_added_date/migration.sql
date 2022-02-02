/*
  Warnings:

  - Added the required column `date` to the `Yumcha` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Yumcha` ADD COLUMN `date` DATE NOT NULL;
