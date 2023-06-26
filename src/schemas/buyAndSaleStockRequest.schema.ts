import Joi from "joi";
import { BuyAndSaleStockRequestProps } from "@/protocols";

const buyAndSaleStockRequestSchema: Joi.ObjectSchema<BuyAndSaleStockRequestProps> = Joi.object({
  stock: Joi.string().required(),
  price: Joi.number().greater(0).required(),
  quantity: Joi.number().integer().greater(0).required(),
});

export default buyAndSaleStockRequestSchema;
