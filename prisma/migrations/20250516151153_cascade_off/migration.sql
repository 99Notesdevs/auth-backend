-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_authorId_fkey";

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
