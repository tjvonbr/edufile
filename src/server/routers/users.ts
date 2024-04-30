import { UserRole } from "@prisma/client";
import { publicProcedure, router } from "../trpc";
import prisma from "@/server/prisma";
import { z } from "zod";

export const userRouter = router({
  getUsers: publicProcedure.query(async () => {
    return await prisma.user.findMany();
  }),
  createUser: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        role: z.nativeEnum(UserRole),
        district: z.string().optional(),
        regionalOffice: z.string().optional(),
      })
    )
    .mutation(async (opts) => {
      console.log(opts);
      const user = await prisma.user.create({
        data: {
          firstName: opts.input.firstName,
          lastName: opts.input.lastName,
          email: opts.input.email,
          role: opts.input.role,
          schoolDistricts: {
            ...(opts.input.district
              ? {
                  connect: {
                    id: opts.input.district,
                  },
                }
              : {}),
          },
          regionalOffices: {
            ...(opts.input.regionalOffice
              ? {
                  connect: {
                    id: opts.input.regionalOffice,
                  },
                }
              : {}),
          },
        },
      });
      console.log(user);

      return user;
    }),
});
