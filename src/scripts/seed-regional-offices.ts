import prisma from "../app/services/prisma.ts";
import { REGIONAL_OFFICES_LENGTH } from "../lib/consts.ts";

interface Region {
  region: string;
  schoolDistricts?: string[];
}

async function main() {
  for (let region = 1; region <= REGIONAL_OFFICES_LENGTH; region++) {
    await prisma.regionalOffice.create({
      data: {
        region: region.toString(),
        schoolDistricts:
          region === 44
            ? {
                create: [
                  {
                    district: "157",
                    name: "Richmond-Burton Community High School District 157",
                  },
                ],
              }
            : {},
      },
    });
  }
}

main();
