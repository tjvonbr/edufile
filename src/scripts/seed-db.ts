import prisma from "../app/services/prisma.ts";
import { UserRole } from "@prisma/client";

async function main() {
  await prisma.user.create({
    data: {
      firstName: "Trevor",
      lastName: "Von Bruenchenhein",
      role: UserRole.SUPER_ADMIN,
    },
  });

  await prisma.user.create({
    data: {
      firstName: "Rylie",
      lastName: "Godfrey",
      role: UserRole.REGIONAL_ADMIN,
    },
  });

  await prisma.user.create({
    data: {
      firstName: "Randall",
      lastName: "Miles",
      role: UserRole.DISTRICT_USER,
    },
  });
}

main();
