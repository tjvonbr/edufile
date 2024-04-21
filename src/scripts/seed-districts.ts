import csv from "csvtojson";
import prisma from "../app/services/prisma.ts";

export async function main() {
  const districts = await csv().fromFile("./il.csv");

  for (const district of districts) {
    try {
      await prisma.schoolDistrict.create({
        data: {
          stateId: district["State ID"],
          ncesDistrictId: district["NCES LEA ID"],
          name: district["District Name"],
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

main();
