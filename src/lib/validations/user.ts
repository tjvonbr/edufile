import { UserRole } from "@prisma/client";
import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  role: z.nativeEnum(UserRole),
  district: z.string().min(1).optional(),
  regionalOffice: z.string().min(1).optional(),
});
