/*
  Warnings:

  - Added the required column `categoryId` to the `QuestionBank` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "QuestionBank" DROP CONSTRAINT "QuestionBank_id_fkey";

-- AlterTable
ALTER TABLE "QuestionBank" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "QuestionBank" ADD CONSTRAINT "QuestionBank_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
