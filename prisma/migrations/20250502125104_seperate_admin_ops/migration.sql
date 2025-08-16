/*
  Warnings:

  - You are about to drop the column `adminOps` on the `Admin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "adminOps";

-- CreateTable
CREATE TABLE "AdminOps" (
    "id" SERIAL NOT NULL,
    "globalRestrictions" BOOLEAN NOT NULL DEFAULT false,
    "globalHeadScripts" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "globalBodyScripts" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "AdminOps_pkey" PRIMARY KEY ("id")
);
