import { DistrictsTable } from "@/components/districts-table";
import { DashboardHeader } from "@/components/header";
import { getDistricts } from "@/lib/helpers/districts";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DistrictsPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const districts = await getDistricts(userId);

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
