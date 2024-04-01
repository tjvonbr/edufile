"use client";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "./ui/button";
import { useState } from "react";
import { Icons } from "./ui/icons";

interface UserCreateButtonProps extends ButtonProps {}

export default function UserCreateButton({
  className,
  variant,
  ...props
}: UserCreateButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {}

  return (
    <button
      onClick={handleSubmit}
      className={cn(
        buttonVariants({ variant: "default" }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      New user
    </button>
  );
}
