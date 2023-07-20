import { prisma } from "@/config/database";
import { SignupDataProps } from "@/protocols";
import { User } from "@prisma/client";

async function findByEmail(email: string): Promise<User> {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

async function create(
  signupData: Omit<SignupDataProps, "confirmPassword">
): Promise<User> {
  return prisma.user.create({
    data: signupData,
  });
}

const userRepositories = {
  findByEmail,
  create,
};

export default userRepositories;
