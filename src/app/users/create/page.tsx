import { UserForm } from "@/components/user-form";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import prisma from "@/server/prisma";

export default async function CreateUserPage() {
  const districts = await prisma.schoolDistrict.findMany();
  const regionalOffices = await prisma.regionalOffice.findMany();

  return (
    <div className="container h-screen w-screen flex flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Users
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.user className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">Create user</h1>
          <p className="text-sm text-muted-foreground">
            Enter their credentials to continue
          </p>
        </div>
        <UserForm districts={districts} regionalOffices={regionalOffices} />
      </div>
    </div>
  );
}
