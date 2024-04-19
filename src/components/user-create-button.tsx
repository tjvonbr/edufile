import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "./ui/button";
import { Icons } from "./ui/icons";
import Link from "next/link";

export default function UserCreateButton() {
  return (
    <Link
      href={"/users/create"}
      className={cn(buttonVariants({ variant: "default" }))}
    >
      <Icons.add className="mr-2 h-4 w-4" />
      New user
    </Link>
  );
}
