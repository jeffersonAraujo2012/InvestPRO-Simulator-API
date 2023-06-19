/*
  Warnings:

  - Added the required column `unitPrice` to the `StockInWallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StockInWallet" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "unitPrice" DOUBLE PRECISION NOT NULL;
