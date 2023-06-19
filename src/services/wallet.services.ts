import { StockInWallet, Wallet } from "@prisma/client";
import walletRepositories from "@/repositories/wallet.repositories";
import { BuyStockRequestProps } from "@/protocols";
import axios from "axios";
import { notFoundError } from "@/errors/not-found.error";
import insufficientFunds from "@/errors/insufficient-funds.error";

async function getAllUserWallet(userId: number): Promise<Wallet[]> {
  return walletRepositories.findManyByUserId(userId);
}

async function buyStock(
  buyStockData: BuyStockRequestProps
): Promise<StockInWallet> {
  const { stock, walletId, price, quantity } = buyStockData;
  const wallet = await walletRepositories.findById(walletId);

  if (!wallet) throw notFoundError('Wallet not found');

  //exists stock
  await axios.get(`https://brapi.dev/api/quote/${stock}?range=1d&interval=1d`);

  if (wallet.balance < price * quantity) {
    throw insufficientFunds();
  }

  const stockInWallet =
    await walletRepositories.findStockInWalletByWalletIdAndStockSymbol({
      walletId,
      stock,
    });

  return walletRepositories.createOrUpdateStockInWalltet({
    ...buyStockData,
    prev: stockInWallet,
  });
}

const walletService = {
  getAllUserWallet,
  buyStock,
};

export default walletService;
