-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_id_fkey";

-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "parentTagId" INTEGER;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_parentTagId_fkey" FOREIGN KEY ("parentTagId") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
