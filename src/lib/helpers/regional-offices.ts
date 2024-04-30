import prisma from "@/server/prisma";
import { RegionalOffice } from "@prisma/client";

export async function getRegionalOffices() {
  const regionalOffices: RegionalOffice[] =
    await prisma.regionalOffice.findMany();

  return regionalOffices;
}
