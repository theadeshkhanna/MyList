import { prismaClient } from "../app";
import { hashSync } from "bcrypt";

class UserService {
  private static instance: UserService;

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async getUserByUsername(username: string) {
    return await prismaClient.user.findFirst({ where: { username } });
  }

  async create(username: string, password: string) {
    return await prismaClient.user.create({
      data: {
        username,
        password: hashSync(password, 10),
      },
    });
  }
}

export default UserService.getInstance();
