import { prisma } from "@/config/database";
import { BuyAndSaleStockRequestProps } from "@/protocols";
import { Wallet, WalletOperation } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

async function findManyByUserId(userId: number): Promise<Wallet[]> {
  return prisma.wallet.findMany({
    where: {
      userId: userId,
    },
  });
}

async function findById(walletId: number): Promise<Wallet> {
  return prisma.wallet.findUnique({
    where: {
      id: walletId,
    },
  });
}

type WalletIdStockSymbol = {
  walletId: number;
  stock: string;
};

async function findWalletOperationByWalletIdAndStockSymbol(
  data: WalletIdStockSymbol
) {
  const buyQuantitySum = await prisma.walletOperation.aggregate({
    where: {
      walletId: data.walletId,
      symbol: data.stock,
      type: 'buy',
    },
    _sum: {
      quantity: true,
    },
  });

  const saleQuantitySum = await prisma.walletOperation.aggregate({
    where: {
      walletId: data.walletId,
      symbol: data.stock,
      type: 'sale',
    },
    _sum: {
      quantity: true,
    },
  });

  const buyQuantity = buyQuantitySum._sum.quantity || 0;
  const saleQuantity = saleQuantitySum._sum.quantity || 0;

  return buyQuantity - saleQuantity;

}

type CreateOrUpdateWalletOperationProps = BuyAndSaleStockRequestProps & {
  type: 'buy' | 'sale'
};

async function createOrUpdateWalletOperation(
  buyStockData: CreateOrUpdateWalletOperationProps
): Promise<WalletOperation> {
  const { stock, price, quantity, walletId, type } = buyStockData;

  const results = await prisma.$transaction([
    prisma.walletOperation.create({
      data: {
        type,
        walletId: walletId,
        symbol: stock,
        quantity: quantity,
        unitPrice: price,
      },
    }),
    prisma.wallet.update({
      where: {
        id: walletId,
      },
      data: {
        balance: {
          decrement: type === 'buy' ? (quantity * price) : (-quantity * price),
        },
      },
    }),
  ]);

  return results[0];
}

const walletRepositories = {
  findManyByUserId,
  createOrUpdateWalletOperation,
  findWalletOperationByWalletIdAndStockSymbol,
  findById,
};

export default walletRepositories;
