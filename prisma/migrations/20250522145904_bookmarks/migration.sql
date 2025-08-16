-- CreateTable
CREATE TABLE "_UserBookmark" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserBookmark_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserBookmark_B_index" ON "_UserBookmark"("B");

-- AddForeignKey
ALTER TABLE "_UserBookmark" ADD CONSTRAINT "_UserBookmark_A_fkey" FOREIGN KEY ("A") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBookmark" ADD CONSTRAINT "_UserBookmark_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
