-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "adminOps" JSONB NOT NULL DEFAULT '{"globalHeadScripts": [], "globalBodyScripts": [], "globalRestrictions": false}';
