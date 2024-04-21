import csv from "csvtojson";
import prisma from "../app/services/prisma.ts";

async function main() {
  const regionalOffices = await csv().fromFile("./il_roe.csv");

  for (const regionalOffice of regionalOffices) {
    const region = regionalOffice["Region"].slice(0, 2);

    try {
      await prisma.regionalOffice.create({
        data: {
          ncesRegionId: regionalOffice["NCES ID"],
          region,
          name: regionalOffice["Name"],
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

main();
