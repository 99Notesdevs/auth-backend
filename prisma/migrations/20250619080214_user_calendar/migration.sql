-- CreateTable
CREATE TABLE "UserCalendar" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "event" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCalendar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserCalendar_userId_idx" ON "UserCalendar"("userId");

-- AddForeignKey
ALTER TABLE "UserCalendar" ADD CONSTRAINT "UserCalendar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
