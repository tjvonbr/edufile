import { User } from "lucide-react";
import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  role: z.string(),
});
