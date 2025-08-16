-- CreateTable
CREATE TABLE "ProgressConstraints" (
    "id" SERIAL NOT NULL,
    "weakLimit" INTEGER NOT NULL,
    "strongLimit" INTEGER NOT NULL,
    "xp_status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgressConstraints_pkey" PRIMARY KEY ("id")
);
