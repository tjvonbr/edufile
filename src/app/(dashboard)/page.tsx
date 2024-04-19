import prisma from "@/app/services/prisma";
import { User } from "@prisma/client";
import { UserTable } from "@/components/UserTable";
import { DashboardHeader } from "@/components/header";
import UserCreateButton from "@/components/user-create-button";

export default async function Dashboard() {
  const users: User[] = await prisma.user.findMany();

  return (
    <div className="container flex-col space-y-8">
      <DashboardHeader heading="Users" text="Create and manage users.">
        <UserCreateButton />
      </DashboardHeader>
      <UserTable users={users} />
    </div>
  );
}
