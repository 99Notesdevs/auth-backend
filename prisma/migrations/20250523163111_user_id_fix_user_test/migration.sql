-- DropIndex
DROP INDEX "UserTests_userId_key";

-- CreateIndex
CREATE INDEX "UserTests_userId_idx" ON "UserTests"("userId");
