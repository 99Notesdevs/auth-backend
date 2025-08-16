-- CreateTable
CREATE TABLE "_TagToBlog" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TagToBlog_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TagToBlog_B_index" ON "_TagToBlog"("B");

-- AddForeignKey
ALTER TABLE "_TagToBlog" ADD CONSTRAINT "_TagToBlog_A_fkey" FOREIGN KEY ("A") REFERENCES "Blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToBlog" ADD CONSTRAINT "_TagToBlog_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
