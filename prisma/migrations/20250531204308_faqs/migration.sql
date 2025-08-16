/*
  Warnings:

  - You are about to drop the column `acceptance` on the `QuestionBank` table. All the data in the column will be lost.
  - You are about to alter the column `rating` on the `QuestionBank` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "FAQ" TEXT DEFAULT '';

-- AlterTable
ALTER TABLE "QuestionBank" DROP COLUMN "acceptance",
ADD COLUMN     "correctAttempts" INTEGER,
ADD COLUMN     "totalAttempts" INTEGER,
ALTER COLUMN "rating" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "UserData" ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 250;
