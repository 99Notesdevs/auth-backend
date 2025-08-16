-- CreateTable
CREATE TABLE "CurrentAffairArticleBlog" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "parentSlug" TEXT NOT NULL,

    CONSTRAINT "CurrentAffairArticleBlog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CurrentAffairArticleBlog_slug_key" ON "CurrentAffairArticleBlog"("slug");

-- CreateIndex
CREATE INDEX "CurrentAffairArticleBlog_slug_idx" ON "CurrentAffairArticleBlog"("slug");

-- CreateIndex
CREATE INDEX "CurrentAffairArticleBlog_parentSlug_idx" ON "CurrentAffairArticleBlog"("parentSlug");

-- CreateIndex
CREATE INDEX "CategoryRating_categoryId_idx" ON "CategoryRating"("categoryId");

-- AddForeignKey
ALTER TABLE "CurrentAffairArticleBlog" ADD CONSTRAINT "CurrentAffairArticleBlog_parentSlug_fkey" FOREIGN KEY ("parentSlug") REFERENCES "CurrentAffairArticle"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
