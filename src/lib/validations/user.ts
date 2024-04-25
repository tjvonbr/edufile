import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  role: z.string().min(1),
  district: z.string().min(1).optional(),
  regionalOffice: z.string().min(1).optional(),
});
