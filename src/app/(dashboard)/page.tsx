import prisma from "@/server/prisma";
import { User, UserRole } from "@prisma/client";
import { UserTable } from "@/components/users/users-table";
import { DashboardHeader } from "@/components/header";
import UserCreateButton from "@/components/user-create-button";
import { auth } from "@clerk/nextjs/server";
import { getUserAndDistrictsById } from "@/lib/helpers/users";
import { notFound, redirect } from "next/navigation";

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in  ");
  }

  const user = await getUserAndDistrictsById(userId);

  if (!user) {
    notFound();
  }

  if (user.role === UserRole.DISTRICT_USER) {
    redirect(`/districts/${user.schoolDistricts[0].id}`);
  }

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
