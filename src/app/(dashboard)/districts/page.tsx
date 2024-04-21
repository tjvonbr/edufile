import { DistrictsTable } from "@/components/districts-table";
import { DashboardHeader } from "@/components/header";
import { getDistricts } from "@/lib/helpers/districts";

export default async function DistrictsPage() {
  const districts = await getDistricts();

  return (
    <div className="container flex-col space-y-8">
      <DashboardHeader
        heading="Districts"
        text="Create and manage districts."
      />
      <DistrictsTable districts={districts} />
    </div>
  );
}
