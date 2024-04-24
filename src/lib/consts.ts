import { UserRole } from "@prisma/client";

export const userRoles = {
  DISTRICT_USER: "District User",
  REGIONAL_ADMIN: "Regional Admin",
  SUPER_ADMIN: "Super Admin",
};

enum ComplianceRequirementStatus {
  INCOMPLETE = "INCOMPLETE",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export const requirementStatusMap = {
  INCOMPLETE: "INCOMPLETE",
  UNDER_REVIEW: "UNDER REVIEW",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

export const REGIONAL_OFFICES_LENGTH = 56;

export const s3BucketRegion = "us-east-2";
export const s3BucketName = "district-documents";
