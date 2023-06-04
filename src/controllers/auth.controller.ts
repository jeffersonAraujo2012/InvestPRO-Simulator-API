import { UserDataProps } from "@/protocols";
import authServices from "@/services/auth.services";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function signin(req: Request, res: Response) {
  const user = req.body as UserDataProps;

  try {
    const userDate = await authServices.signin(user);
    return res.status(httpStatus.OK).send(userDate);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
