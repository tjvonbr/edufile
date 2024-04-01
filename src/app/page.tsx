import prisma from "@/app/services/prisma";
import { User } from "@prisma/client";
import { UserTable } from "@/components/UserTable";

export default async function Dashboard() {
  const users: User[] = await prisma?.user.findMany();

  return (
    <div className="container flex-col space-y-8">
      <div className="flex items-start gap-8">
        <div className="flex flex-col">
          <h1 className="text-3xl font-black">Users</h1>
          <h2 className="text-lg text-gray-400">
            Access and manage your users
          </h2>
        </div>
      </div>
      <UserTable users={users} />
    </div>
  );
}
