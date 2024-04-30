import prisma from "../server/prisma.ts";
import csv from "csvtojson";

export async function main() {
  const districts = await csv().fromFile("./il.csv");

  for (const district of districts) {
    try {
      await prisma.schoolDistrict.create({
        data: {
          stateId: district["State ID"],
          ncesDistrictId: district["NCES LEA ID"],
          name: district["District Name"],
          phone: district["Telephone"],
          mailingAddress: district["Mailing Address"],
          city: district["City"],
          state: district["State"],
          zip: district["Zip Code"],
          zipPlusFour: district["Zip +4"],
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

main();
