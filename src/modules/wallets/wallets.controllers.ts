import { AuthRequest } from "@/middlewares/auth.middleware";
import { Response } from "express";
import httpStatus from "http-status";
import walletService from "./wallets.services";
import { BuyAndSaleStockRequestProps } from "@/protocols";

export async function getAllUserWallet(req: AuthRequest, res: Response) {
  const userId = req.userId;

  try {
    const userWallets = await walletService.getAllUserWallet(userId);
    return res.status(httpStatus.OK).send(userWallets);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function buyStock(req: AuthRequest, res: Response) {
  const walletId = Number(req.params.id);
  const { stock, price, quantity } = req.body as BuyAndSaleStockRequestProps;

  try {
    const buyData = await walletService.buyStock({ stock, price, quantity, walletId });
    return res.status(httpStatus.CREATED).send(buyData);
  } catch (error) {
    console.log(error);
    if (error.response?.data) {
      return res.status(error.response.status).send(error.response?.data?.error)
    }
    if (error.name === 'InsufficientFunds') {
      return res.status(httpStatus.FORBIDDEN).send(error.message);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function sellStock(req: AuthRequest, res: Response) {
  const walletId = Number(req.params.id);
  const { stock, price, quantity } = req.body as BuyAndSaleStockRequestProps;

  try {
    const saleData = await walletService.sellStock({ stock, price, quantity, walletId });
    return res.status(httpStatus.CREATED).send(saleData);
  } catch (error) {
    console.log(error);
    if (error.response?.data) {
      return res.status(error.response.status).send(error.response?.data?.error)
    }
    if (error.name === 'InsufficientFunds') {
      return res.status(httpStatus.FORBIDDEN).send(error.message);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}
