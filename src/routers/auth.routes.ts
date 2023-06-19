import { signin, signup } from "@/controllers/auth.controller";
import { validateBody } from "@/middlewares/validate.middleware";
import signinSchema from "@/schemas/signin.schema";
import signupSchema from "@/schemas/signup.schema";
import { Router } from "express";

const authRouter = Router();

authRouter.post('/sign-in', validateBody(signinSchema), signin);
authRouter.post('/sign-up', validateBody(signupSchema), signup);

export default authRouter;