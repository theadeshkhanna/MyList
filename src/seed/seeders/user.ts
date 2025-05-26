import { hashSync } from "bcrypt";
import { prismaClient } from "../../app";

export const seedUsers = async () => {
  const users = [];

  for (let i = 0; i < 5; i++) {
    users.push({
      username: `testuser-${i + 1}`,
      password: hashSync("password", 10),
    });
  }

  return Promise.all(
    users.map((user) => prismaClient.user.create({ data: user }))
  );
};
