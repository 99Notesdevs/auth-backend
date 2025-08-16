-- CreateTable
CREATE TABLE "CategoryRating" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryRating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CategoryRating_userId_idx" ON "CategoryRating"("userId");

-- AddForeignKey
ALTER TABLE "CategoryRating" ADD CONSTRAINT "CategoryRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryRating" ADD CONSTRAINT "CategoryRating_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
