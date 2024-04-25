import { RegionalOffice } from "@prisma/client";
import prisma from "../app/services/prisma.ts";
import csv from "csvtojson";

export async function main() {
  const roe44 = "ba703a6b-bba9-44e3-84c3-7ac77617916c";
  const roe44SchoolDistrictIds = [
    { id: "1d954fd4-3559-4d87-be91-6357622121e8" },
    { id: "f8331110-b3a4-43f7-8ae8-c602eb90827f" },
    { id: "3a4c524c-f29d-4508-9685-bf876844683b" },
    { id: "70cb9906-e109-4f8a-bb42-42090c982e41" },
    { id: "798f9ba9-6167-4d45-b694-58972394b36c" },
    { id: "fd5bc042-c75d-48c0-b790-da24da92d872" },
    { id: "fc48e616-0eee-4b49-b475-b2e2e22dc186" },
    { id: "80a25de5-7c06-45d0-ac28-3e39a33fbf71" },
    { id: "02b92ae8-0f1d-4e33-be9f-377f3ae56819" },
    { id: "a88bd4bb-920e-4a34-8e88-c2a42d4be169" },
    { id: "4aad9bc7-9026-4273-8fae-3ea6a38d0fd5" },
    { id: "1ead2289-8e23-4382-9c91-e2781cdc5912" },
    { id: "05d17c25-a349-4ee7-8177-c6e0c19c6f10" },
    { id: "e09dafd2-da67-4fe5-be02-91b3bb417575" },
    { id: "004dd4a0-e643-4bf2-ad46-cf84dc778157" },
    { id: "758341b8-60d6-4b1d-9460-6549b33343d1" },
  ];

  await prisma.regionalOffice.update({
    where: {
      id: roe44,
    },
    data: {
      schoolDistricts: {
        connect: roe44SchoolDistrictIds,
      },
    },
  });
}

main();
