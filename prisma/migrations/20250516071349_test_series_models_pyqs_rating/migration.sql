-- AlterTable
ALTER TABLE "QuestionBank" ADD COLUMN     "acceptance" INTEGER,
ADD COLUMN     "multipleCorrectType" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pyq" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rating" DECIMAL(65,30),
ADD COLUMN     "year" INTEGER;

-- CreateTable
CREATE TABLE "Tests" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "correctAttempted" INTEGER NOT NULL,
    "wrongAttempted" INTEGER NOT NULL,
    "notAttempted" INTEGER NOT NULL,
    "partialAttempted" INTEGER,
    "partialNotAttempted" INTEGER,
    "partialWrongAttempted" INTEGER,
    "timeTaken" INTEGER NOT NULL,
    "questionsSingle" INTEGER NOT NULL,
    "questionsMultiple" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestSeries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "correctAttempted" INTEGER NOT NULL,
    "wrongAttempted" INTEGER NOT NULL,
    "notAttempted" INTEGER NOT NULL,
    "partialAttempted" INTEGER,
    "partialNotAttempted" INTEGER,
    "partialWrongAttempted" INTEGER,
    "timeTaken" INTEGER NOT NULL,
    "questionsSingle" INTEGER NOT NULL,
    "questionsMultiple" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "questionIds" INTEGER[],

    CONSTRAINT "TestSeries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TestSeriesToQuestionBank" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TestSeriesToQuestionBank_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "Tests_name_idx" ON "Tests"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TestSeries_name_key" ON "TestSeries"("name");

-- CreateIndex
CREATE INDEX "TestSeries_name_idx" ON "TestSeries"("name");

-- CreateIndex
CREATE INDEX "_TestSeriesToQuestionBank_B_index" ON "_TestSeriesToQuestionBank"("B");

-- AddForeignKey
ALTER TABLE "_TestSeriesToQuestionBank" ADD CONSTRAINT "_TestSeriesToQuestionBank_A_fkey" FOREIGN KEY ("A") REFERENCES "QuestionBank"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TestSeriesToQuestionBank" ADD CONSTRAINT "_TestSeriesToQuestionBank_B_fkey" FOREIGN KEY ("B") REFERENCES "TestSeries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
