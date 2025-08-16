-- CreateTable
CREATE TABLE "_TagToCurrentBlog" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TagToCurrentBlog_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TagToCurrentBlog_B_index" ON "_TagToCurrentBlog"("B");

-- AddForeignKey
ALTER TABLE "_TagToCurrentBlog" ADD CONSTRAINT "_TagToCurrentBlog_A_fkey" FOREIGN KEY ("A") REFERENCES "CurrentAffairArticleBlog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToCurrentBlog" ADD CONSTRAINT "_TagToCurrentBlog_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
