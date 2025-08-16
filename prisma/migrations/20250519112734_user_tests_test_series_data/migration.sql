-- CreateTable
CREATE TABLE "UserTests" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "questionIds" INTEGER[],
    "response" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTestSeries" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "testId" INTEGER NOT NULL,
    "response" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTestSeries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserTests_userId_key" ON "UserTests"("userId");

-- CreateIndex
CREATE INDEX "UserTestSeries_userId_idx" ON "UserTestSeries"("userId");

-- AddForeignKey
ALTER TABLE "UserTests" ADD CONSTRAINT "UserTests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTestSeries" ADD CONSTRAINT "UserTestSeries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
