-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "salePrice" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Coupon" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "validity" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "usageLimit" INTEGER,
    "timesUsed" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToCoupon" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserToCoupon_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_code_key" ON "Coupon"("code");

-- CreateIndex
CREATE INDEX "_UserToCoupon_B_index" ON "_UserToCoupon"("B");

-- AddForeignKey
ALTER TABLE "_UserToCoupon" ADD CONSTRAINT "_UserToCoupon_A_fkey" FOREIGN KEY ("A") REFERENCES "Coupon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToCoupon" ADD CONSTRAINT "_UserToCoupon_B_fkey" FOREIGN KEY ("B") REFERENCES "UserData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
