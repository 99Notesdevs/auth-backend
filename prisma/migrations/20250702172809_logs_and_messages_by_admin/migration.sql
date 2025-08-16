-- CreateTable
CREATE TABLE "AdminLogs" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminMessages" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "ratingS" INTEGER DEFAULT 0,
    "ratingE" INTEGER DEFAULT 0,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminMessages_pkey" PRIMARY KEY ("id")
);
