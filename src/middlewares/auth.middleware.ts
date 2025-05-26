import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "../app";
import { User } from "@prisma/client";

declare module "express" {
  interface Request {
    user?: User;
  }
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new Error("Unauthorized");
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;

    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId },
    });

    if (!user) {
      throw new Error("Unauthorized");
    }

    req.user = user;
    next();
  } catch (err) {
    throw new Error("Unauthorized");
  }
};

export default authMiddleware;
