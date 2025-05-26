import { Request, Response } from "express";
import { compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { loginSchema, signupSchema } from "../validations/auth.validation";
import userService from "../services/user.service";

export const login = async (req: Request, res: Response) => {
  try {
    loginSchema.parse(req.body);
  } catch (error: any) {
    res
      .status(422)
      .json({ message: "Unprocessable entity", error: error.issues });
  }

  try {
    const { username, password } = req.body;
    let user = await userService.getUserByUsername(username);
    if (!user) {
      throw Error(`User does not exists, please signup first`);
    }

    if (!compareSync(password, user.password)) {
      throw Error(`Incorrect password`);
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      JWT_SECRET
    );

    res.status(200).json({ user, token });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to login", error: error.message });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    signupSchema.parse(req.body);
  } catch (error: any) {
    res
      .status(422)
      .json({ message: "Unprocessable entity", error: error.issues });
  }

  try {
    const { username, password } = req.body;
    let user = await userService.getUserByUsername(username);
    if (user) {
      throw Error(`User already exists`);
    }

    user = await userService.create(username, password);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to signup", error: error.message });
  }
};
