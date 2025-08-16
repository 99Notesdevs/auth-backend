-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "image" TEXT DEFAULT '',
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '99Notes';

-- AlterTable
ALTER TABLE "Author" ALTER COLUMN "name" SET DEFAULT '',
ALTER COLUMN "image" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Editor" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "image" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "adminId" INTEGER;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
