import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export type AuthRequest = Request & {
  userId: number;
};

export default function auth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const regexAuth = /^Bearer\s+/i;

  let token = req.headers?.authorization;
  if (!token) {
    res.status(httpStatus.UNAUTHORIZED).send("No token");
  }

  token = token.replace(regexAuth,'');
  
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: number;
    };
    req.userId = data.userId;
    next();
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}
