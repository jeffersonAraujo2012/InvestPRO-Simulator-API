import { unauthorizedError } from "@/errors";
import { SignupDataProps, UserDataProps } from "@/protocols";
import userRepositories from "@/repositories/user.repositories";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import conflictError from "@/errors/conflict.error";

type SigninReturn = Omit<User, "password"> & {
  token: string;
};

async function signin(user: UserDataProps): Promise<SigninReturn> {
  const userDB = await userRepositories.findByEmail(user.email);

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

type SignupReturn = Omit<User, "password">;

async function signup(signupData: SignupDataProps): Promise<SignupReturn> {
  const { name, email, password } = signupData;

  const userWithSameEmail = await userRepositories.findByEmail(email);
  if (userWithSameEmail) throw conflictError();

  const passwordHash = await bcrypt.hash(password, 10);
  const newUserData = {
    name,
    email,
    password: passwordHash,
  };
  
  const newUser = await userRepositories.create(newUserData);
  delete newUser.password;

  return {
    ...newUser
  }
}

const authServices = {
  signin,
  signup,
};

export default authServices;
