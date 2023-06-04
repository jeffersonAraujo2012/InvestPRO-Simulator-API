import { signin } from "@/controllers/auth.controller";
import { validateBody } from "@/middlewares/validate.middleware";
import signinSchema from "@/schemas/signin.schema";
import { Router } from "express";

const authRouter = Router();

authRouter.post('/sign-in', validateBody(signinSchema), signin);

export default authRouter;