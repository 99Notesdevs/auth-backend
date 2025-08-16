-- AddForeignKey
ALTER TABLE "UserTestSeries" ADD CONSTRAINT "UserTestSeries_testId_fkey" FOREIGN KEY ("testId") REFERENCES "TestSeries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
