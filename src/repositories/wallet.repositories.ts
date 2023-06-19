import { prisma } from "@/config/database";
import { BuyStockRequestProps } from "@/protocols";
import { StockInWallet, Wallet } from "@prisma/client";

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

async function findStockInWalletByWalletIdAndStockSymbol(
  data: WalletIdStockSymbol
) {
  return prisma.stockInWallet.findFirst({
    where: {
      walletId: data.walletId,
      symbol: data.stock,
    },
  });
}

type CreateOrUpdateStockInWalltetProps = BuyStockRequestProps & {
  prev: StockInWallet;
};

async function createOrUpdateStockInWalltet(
  buyStockData: CreateOrUpdateStockInWalltetProps
): Promise<StockInWallet> {
  const { stock, price, quantity, walletId, prev } = buyStockData;

  const results = await prisma.$transaction([
    prisma.stockInWallet.upsert({
      create: {
        walletId: walletId,
        symbol: stock,
        quantity: quantity,
        unitPrice: price,
      },

      where: {
        id: prev?.id || -1,
      },

      update: {
        quantity: {
          increment: quantity,
        },
        unitPrice:
          (prev?.quantity * prev?.unitPrice + quantity * price) /
            (prev?.quantity + quantity) || 0,
      },
    }),
    prisma.wallet.update({
      where: {
        id: walletId,
      },
      data: {
        balance: {
          decrement: quantity * price,
        },
      },
    }),
  ]);

  return results[0];
}

const walletRepositories = {
  findManyByUserId,
  createOrUpdateStockInWalltet,
  findStockInWalletByWalletIdAndStockSymbol,
  findById,
};

export default walletRepositories;
