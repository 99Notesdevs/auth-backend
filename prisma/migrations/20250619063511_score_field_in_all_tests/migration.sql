/*
  Warnings:

  - Added the required column `score` to the `UserTestSeries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserTestSeries" ADD COLUMN     "score" INTEGER NOT NULL;
