import { getDistricts } from "@/lib/helpers/districts";
import prisma from "../app/services/prisma.ts";

export async function main() {
  const districts = await prisma.schoolDistrict.findMany();

  const sexEquity = await prisma.complianceRequirement.create({
    data: {
      name: "Sex Equity Evaluation",
      year: 2024,
    },
  });

  const minimumImmunization = await prisma.complianceRequirement.create({
    data: {
      name: "Minimum Immunization Requirements",
      year: 2024,
    },
  });

  const permanentStudent = await prisma.complianceRequirement.create({
    data: {
      name: "Student Permanent Records",
      year: 2024,
    },
  });

  for (const district of districts) {
    try {
      await prisma.districtComplianceRequirements.createMany({
        data: [
          {
            schoolDistrictId: district.id,
            complianceRequirementId: sexEquity.id,
          },
          {
            schoolDistrictId: district.id,
            complianceRequirementId: minimumImmunization.id,
          },
          {
            schoolDistrictId: district.id,
            complianceRequirementId: permanentStudent.id,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }
}

main();
