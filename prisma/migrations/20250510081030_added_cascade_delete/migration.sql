-- DropForeignKey
ALTER TABLE "ChatRoom" DROP CONSTRAINT "ChatRoom_articleId_fkey";

-- AddForeignKey
ALTER TABLE "ChatRoom" ADD CONSTRAINT "ChatRoom_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;
