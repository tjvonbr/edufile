import { DistrictsTable } from "@/components/districts/districts-table";
import { DashboardHeader } from "@/components/header";
import { getDistricts } from "@/lib/helpers/districts";
import { getUserAndDistrictsById } from "@/lib/helpers/users";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

export default async function DistrictsPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserAndDistrictsById(userId);

  if (!user) {
    notFound();
  }

  const reqs = user.regionalOffices[0].schoolDistricts.map(
    (district) => district.complianceRequirements as any
  );

  return (
    <div className="container flex-col space-y-8">
      <DashboardHeader
        heading="Districts"
        text="Create and manage districts."
      />
      <DistrictsTable districts={user.regionalOffices[0].schoolDistricts} />
    </div>
  );
}
