/*
  Warnings:

  - You are about to drop the `StockInWallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StockInWallet" DROP CONSTRAINT "StockInWallet_walletId_fkey";

-- DropTable
DROP TABLE "StockInWallet";

-- CreateTable
CREATE TABLE "WalletOperation" (
    "id" SERIAL NOT NULL,
    "walletId" INTEGER NOT NULL,
    "symbol" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WalletOperation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WalletOperation" ADD CONSTRAINT "WalletOperation_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
