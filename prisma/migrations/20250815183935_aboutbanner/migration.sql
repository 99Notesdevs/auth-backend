/*
  Warnings:

  - Added the required column `status` to the `Shipping` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ShippingStatus" AS ENUM ('Processing', 'Shipped', 'Delivered', 'Cancelled');

-- AlterTable
ALTER TABLE "About99Notes" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Shipping" ADD COLUMN     "status" "ShippingStatus" NOT NULL;
