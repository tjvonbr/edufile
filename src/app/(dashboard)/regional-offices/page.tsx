import { DashboardHeader } from "@/components/header";
import { getRegionalOffices } from "@/lib/helpers/regional-offices";
import { RegionalOfficesTable } from "@/components/regional-offices-table";

export default async function RegionalOfficesPage() {
  const regionalOffices = await getRegionalOffices();

  return (
    <div className="container flex-col space-y-8">
      <DashboardHeader
        heading="Regional offices"
        text="Create and manage regional offices."
      />
      <RegionalOfficesTable regionalOffices={regionalOffices} />
    </div>
  );
}
