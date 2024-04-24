import { User } from "@prisma/client";

export interface UserWithSchoolDistricts extends User {
  schoolDistricts: SchoolDistrict[];
}
