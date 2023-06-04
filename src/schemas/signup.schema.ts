import { SignupDataProps } from "@/protocols";
import Joi from "joi";

const signupSchema = Joi.object<SignupDataProps>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

export default signupSchema;