/*
  Warnings:

  - A unique constraint covering the columns `[userId,categoryId]` on the table `CategoryRating` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CategoryRating_userId_categoryId_key" ON "CategoryRating"("userId", "categoryId");
