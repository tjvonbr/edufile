import prisma from "@/app/services/prisma";
import { SchoolDistrict } from "@prisma/client";

export async function getDistricts() {
  const districts: SchoolDistrict[] = await prisma.schoolDistrict.findMany();

  return districts;
}
