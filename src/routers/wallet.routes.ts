import { getAllUserWallet, buyStock } from "@/controllers/wallet.controller";
import auth from "@/middlewares/auth.middleware";
import { Router } from "express";
import {
  validateBody,
  validateParams,
} from "@/middlewares/validate.middleware";
import buyStockRequestSchema from "@/schemas/buyStockRequest.schema";
import genericModelIdSchema from "@/schemas/genericModelId.schema";

const walletRouter = Router();

walletRouter.all("*", auth);
walletRouter.get("/", getAllUserWallet);
walletRouter.post(
  "/:id/buy",
  validateBody(buyStockRequestSchema),
  validateParams(genericModelIdSchema),
  buyStock
);

export default walletRouter;
