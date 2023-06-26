import { getAllUserWallet, buyStock, sellStock } from "@/controllers/wallet.controller";
import auth from "@/middlewares/auth.middleware";
import { Router } from "express";
import {
  validateBody,
  validateParams,
} from "@/middlewares/validate.middleware";
import buyAndSaleStockRequestSchema from "@/schemas/buyAndSaleStockRequest.schema";
import genericModelIdSchema from "@/schemas/genericModelId.schema";

const walletRouter = Router();

walletRouter.all("*", auth);
walletRouter.get("/", getAllUserWallet);
walletRouter.post(
  "/:id/buy",
  validateBody(buyAndSaleStockRequestSchema),
  validateParams(genericModelIdSchema),
  buyStock
);
walletRouter.post(
  "/:id/sale",
  validateBody(buyAndSaleStockRequestSchema),
  validateParams(genericModelIdSchema),
  sellStock
);

export default walletRouter;
