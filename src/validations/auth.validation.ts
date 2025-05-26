import { z } from "zod";

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const signupSchema = z.object({
  username: z.string(),
  password: z.string(),
});
