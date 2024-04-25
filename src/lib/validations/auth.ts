import * as z from "zod";

export const userAuthSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  role: z.string().min(1),
});
