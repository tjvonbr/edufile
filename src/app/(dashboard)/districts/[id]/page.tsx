import { RequirementCard } from "@/components/districts/requirement-card";
import { DashboardHeader } from "@/components/header";
import { getDistrictAndReqsById } from "@/lib/helpers/districts";
import { getUserAndDistrictsById } from "@/lib/helpers/users";
import { auth } from "@clerk/nextjs/server";
import { ComplianceRequirementStatus } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

interface DistrictPageProps {
  params: {
    id: string;
  };
}

export default async function DistrictPage({
  params: { id },
}: DistrictPageProps) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserAndDistrictsById(userId);

  if (!user) {
    notFound();
  }

  const district = await getDistrictAndReqsById(id);

  if (!district) {
    notFound();
  }

  const reqs = district.complianceRequirements;

  return (
    <div className="grid gap-5">
      <DashboardHeader heading={district.name} />
      {reqs.length && reqs.length > 0
        ? reqs.map((requirement, idx) => {
            return (
              <RequirementCard
                key={idx}
                requirement={requirement}
                user={user}
              />
            );
          })
        : null}
    </div>
  );
}
