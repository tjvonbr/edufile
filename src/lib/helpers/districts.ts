import prisma from "@/app/services/prisma";
import { SchoolDistrict } from "@prisma/client";

export async function getDistricts(): Promise<SchoolDistrict[]> {
  const districts: SchoolDistrict[] = await prisma.schoolDistrict.findMany();

  return districts;
}

export async function getDistrictById(
  id: string
): Promise<SchoolDistrict | null> {
  const district: SchoolDistrict | null = await prisma.schoolDistrict.findFirst(
    {
      where: {
        id,
      },
    }
  );

  return district;
}
