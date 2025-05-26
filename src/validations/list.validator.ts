import { z } from "zod";

export const createListSchema = z.object({
  name: z.string(),
});

export const updateListSchema = z.object({
  name: z.string(),
});
