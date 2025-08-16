-- AlterTable
ALTER TABLE "AdminOps" ADD COLUMN     "practiceQuestions" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "questionNumber" INTEGER;
