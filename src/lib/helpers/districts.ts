import prisma from "@/server/prisma";
import { SchoolDistrict } from "@prisma/client";

export async function getDistricts(userId: string): Promise<SchoolDistrict[]> {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      schoolDistricts: true,
    },
  });

  if (!user) {
    throw new Error("Could not find user.");
  }

  const districtIds = user.schoolDistricts.map((district) => district.id);

  const districts: SchoolDistrict[] = await prisma.schoolDistrict.findMany({
    where: {
      id: { in: districtIds },
    },
  });

  return districts;
}

export async function getDistrictById(
  id: string,
  includeReqs: boolean = false
): Promise<SchoolDistrict | null> {
  const district: SchoolDistrict | null = await prisma.schoolDistrict.findFirst(
    {
      where: {
        id,
      },
      include: {
        complianceRequirements: includeReqs,
      },
    }
  );

  return district;
}

export async function getDistrictAndReqsById(id: string) {
  const district = await prisma.schoolDistrict.findFirst({
    where: {
      id,
    },
    include: {
      complianceRequirements: {
        include: {
          complianceRequirement: true,
        },
      },
    },
  });

  return district;
}
