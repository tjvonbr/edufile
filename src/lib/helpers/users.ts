import prisma from "@/app/services/prisma";

export async function getUserAndDistrictsById(id: string): Promise<any | null> {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      regionalOffices: {
        include: {
          schoolDistricts: {
            include: {
              complianceRequirements: true,
            },
          },
        },
      },
      schoolDistricts: true,
    },
  });

  return user;
}
