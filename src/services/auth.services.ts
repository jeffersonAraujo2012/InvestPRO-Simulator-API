import { unauthorizedError } from "@/errors";
import { UserDataProps } from "@/protocols";
import userRepositories from "@/repositories/user.repositories";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

type SigninReturn = Omit<User, "password"> & {
  token: string;
};

async function signin(user: UserDataProps): Promise<SigninReturn> {
  const userDB = await userRepositories.findUnique(user.email);

  const passwordIsCorrect = await bcrypt.compare(
    user.password,
    userDB?.password
  );

  if (!userDB || !passwordIsCorrect) {
    throw unauthorizedError("Email ou senha incorretos");
  }

  delete userDB.password;

  const token = jwt.sign({ userId: userDB.id }, process.env.JWT_SECRET, {
    expiresIn: "30 days",
  });

  return {
    ...userDB,
    token,
  };
}

const authServices = {
  signin,
};

export default authServices;
