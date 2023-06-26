/*
  Warnings:

  - Added the required column `type` to the `WalletOperation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeOperation" AS ENUM ('buy', 'sale');

-- AlterTable
ALTER TABLE "WalletOperation" ADD COLUMN     "type" "TypeOperation" NOT NULL;
