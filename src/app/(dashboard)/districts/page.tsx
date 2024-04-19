import { DashboardHeader } from "@/components/header";
import UserCreateButton from "@/components/user-create-button";

export default function DistrictsPage() {
  return (
    <div className="container flex-col space-y-8">
      <DashboardHeader heading="Districts" text="Create and manage districts.">
        <UserCreateButton />
      </DashboardHeader>
      {/* <UserTable users={users} /> */}
    </div>
  );
}
