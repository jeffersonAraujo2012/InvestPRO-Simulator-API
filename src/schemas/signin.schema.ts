import Joi from "joi";
import { UserDataProps } from "@/protocols";

const signinSchema: Joi.ObjectSchema<UserDataProps> = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

export default signinSchema;