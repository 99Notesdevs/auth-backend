-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('softCopy', 'hardCopy');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "type" "ProductType" NOT NULL DEFAULT 'softCopy';
