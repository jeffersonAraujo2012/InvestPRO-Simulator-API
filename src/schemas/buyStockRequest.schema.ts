import Joi from "joi";
import { BuyStockRequestProps } from "@/protocols";

const buyStockRequestSchema: Joi.ObjectSchema<BuyStockRequestProps> = Joi.object({
  stock: Joi.string().required(),
  price: Joi.number().greater(0).required(),
  quantity: Joi.number().integer().greater(0).required(),
});

export default buyStockRequestSchema;
