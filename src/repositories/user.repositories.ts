import { prisma } from "@/config/database";
import { User } from "@prisma/client";

async function findUnique(email: string): Promise<User> {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

const userRepositories = {
  findUnique,
};

export default userRepositories;
