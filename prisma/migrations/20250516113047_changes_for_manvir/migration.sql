-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "desciption" TEXT,
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "author" TEXT;
