import { WalletOperation, Wallet } from "@prisma/client";
import walletRepositories from "@/repositories/wallet.repositories";
import { BuyAndSaleStockRequestProps } from "@/protocols";
import axios from "axios";
import { notFoundError } from "@/errors/not-found.error";
import insufficientFunds from "@/errors/insufficient-funds.error";

async function getAllUserWallet(userId: number): Promise<Wallet[]> {
  return walletRepositories.findManyByUserId(userId);
}

async function buyStock(
  buyStockData: BuyAndSaleStockRequestProps
): Promise<WalletOperation> {
  const { stock, walletId, price, quantity } = buyStockData;
  const wallet = await walletRepositories.findById(walletId);

  if (!wallet) throw notFoundError("Wallet not found");

  //exists stock
  await axios.get(`https://brapi.dev/api/quote/${stock}?range=1d&interval=1d`);

  if (wallet.balance < price * quantity) {
    throw insufficientFunds();
  }

  return walletRepositories.createOrUpdateWalletOperation({
    ...buyStockData,
    type: "buy",
  });
}

async function sellStock(
  buyStockData: BuyAndSaleStockRequestProps
): Promise<WalletOperation> {
  const { stock, walletId, price, quantity } = buyStockData;
  const wallet = await walletRepositories.findById(walletId);

  if (!wallet) throw notFoundError("Wallet not found");

  //exists stock
  const stockBalance =
    await walletRepositories.findWalletOperationByWalletIdAndStockSymbol({
      walletId,
      stock,
    });
  if (!stockBalance) throw notFoundError("Stock not found in wallet");

  if (stockBalance - quantity < 0) throw insufficientFunds();

  return walletRepositories.createOrUpdateWalletOperation({
    ...buyStockData,
    type: "sale",
  });
}

const walletService = {
  getAllUserWallet,
  buyStock,
  sellStock,
};

export default walletService;
