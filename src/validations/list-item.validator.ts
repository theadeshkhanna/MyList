import { z } from "zod";

export const addItemToListSchema = z.object({
  contentId: z.string(),
});
