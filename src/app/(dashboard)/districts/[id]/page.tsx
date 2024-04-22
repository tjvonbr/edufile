import { DistrictDetails } from "@/components/districts/district-details";
import { DashboardHeader } from "@/components/header";
import { getDistrictById } from "@/lib/helpers/districts";
import { notFound } from "next/navigation";

interface DistrictPageProps {
  params: {
    id: string;
  };
}

export default async function DistrictPage({
  params: { id },
}: DistrictPageProps) {
  const district = await getDistrictById(id);

  if (!district) {
    notFound();
  }

  const districtDetails = {
    phone: district.phone,
    mailingAddress: district.mailingAddress,
    city: district.city,
    state: district.state,
    zip: district.zip,
    zipPlusFour: district.zipPlusFour,
  };

  return (
    <div>
      <DashboardHeader heading={district.name} />
      <DistrictDetails params={districtDetails} />
    </div>
  );
}
