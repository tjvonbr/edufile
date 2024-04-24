import prisma from "@/app/services/prisma";
import { UserWithSchoolDistricts } from "@/types";

export async function getUserAndDistrictsById(
  id: string
): Promise<UserWithSchoolDistricts | null> {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      schoolDistricts: true,
    },
  });

  return user;
}
