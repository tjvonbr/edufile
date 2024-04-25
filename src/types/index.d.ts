import {
  DistrictComplianceRequirements,
  RegionalOffice,
  SchoolDistrict,
  User,
} from "@prisma/client";

export interface SchoolDistrictWithReqs extends SchoolDistrict {
  complianceRequirements: DistrictComplianceRequirements;
}
export interface RegionalOfficeWithSchoolDistricts {
  schoolDistricts: SchoolDistrict[];
}

export interface UserWithRegionalOfficeAndSchoolDistrictsAndReqs extends User {
  regionalOffices: RegionalOfficeWithSchoolDistricts[];
}

export interface UserWithSchoolDistricts extends User {
  schoolDistricts: SchoolDistrict[];
}
