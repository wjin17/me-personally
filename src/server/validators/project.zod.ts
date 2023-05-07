import { z } from "zod";

export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  url: z.string().url(),
  image: z.string().url(),
});
