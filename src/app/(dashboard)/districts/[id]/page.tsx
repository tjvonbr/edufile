import { RequirementCard } from "@/components/districts/requirement-card";
import { DashboardHeader } from "@/components/header";
import { getDistrictAndReqsById } from "@/lib/helpers/districts";
import { ComplianceRequirementStatus } from "@prisma/client";
import { notFound } from "next/navigation";

interface DistrictPageProps {
  params: {
    id: string;
  };
}

export default async function DistrictPage({
  params: { id },
}: DistrictPageProps) {
  const district = await getDistrictAndReqsById(id);

  if (!district) {
    notFound();
  }

  const reqs = district.complianceRequirements;

  const districtDetails = {
    phone: district.phone,
    mailingAddress: district.mailingAddress,
    city: district.city,
    state: district.state,
    zip: district.zip,
    zipPlusFour: district.zipPlusFour,
  };

  function renderStatusBadge(status: string) {
    switch (status) {
      case ComplianceRequirementStatus.APPROVED:
        return "success";
      case ComplianceRequirementStatus.INCOMPLETE:
        return "destructive";
      default:
        return "secondary";
    }
  }

  return (
    <div className="grid gap-5">
      <DashboardHeader heading={district.name} />
      {/* <DistrictDetails params={districtDetails} /> */}
      {reqs.length && reqs.length > 0
        ? reqs.map((requirement, idx) => {
            return <RequirementCard key={idx} requirement={requirement} />;
          })
        : null}
    </div>
  );
}
