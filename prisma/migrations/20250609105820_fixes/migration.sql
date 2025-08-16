/*
  Warnings:

  - You are about to drop the `Practice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SolvedPractice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WrongPractice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SolvedPractice" DROP CONSTRAINT "SolvedPractice_practiceId_fkey";

-- DropForeignKey
ALTER TABLE "SolvedPractice" DROP CONSTRAINT "SolvedPractice_userDataId_fkey";

-- DropForeignKey
ALTER TABLE "WrongPractice" DROP CONSTRAINT "WrongPractice_practiceId_fkey";

-- DropForeignKey
ALTER TABLE "WrongPractice" DROP CONSTRAINT "WrongPractice_userDataId_fkey";

-- DropTable
DROP TABLE "Practice";

-- DropTable
DROP TABLE "SolvedPractice";

-- DropTable
DROP TABLE "WrongPractice";
