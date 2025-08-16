/*
  Warnings:

  - You are about to drop the column `action` on the `AdminLogs` table. All the data in the column will be lost.
  - Added the required column `endpoint` to the `AdminLogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `method` to the `AdminLogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `AdminLogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdminLogs" DROP COLUMN "action",
ADD COLUMN     "endpoint" TEXT NOT NULL,
ADD COLUMN     "method" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "user" TEXT,
ADD COLUMN     "userId" INTEGER;
