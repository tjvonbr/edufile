"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/ui/icons";
import { userAuthSchema } from "@/lib/validations/auth";
import { userSchema } from "@/lib/validations/user";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SchoolDistrict, UserRole } from "@prisma/client";

interface UserForm extends React.HTMLAttributes<HTMLDivElement> {
  districts: SchoolDistrict[];
}

type FormData = z.infer<typeof userSchema>;

export function UserForm({ districts, className, ...props }: UserForm) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const searchParams = useSearchParams();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/dashboard",
    });

    setIsLoading(false);

    if (!signInResult?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      });
    }

    return toast({
      title: "Check your email",
      description: "We sent you a login link. Be sure to check your spam too.",
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-4">
            <Label className="sr-only" htmlFor="firstName">
              First name
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="First name"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("firstName")}
            />
            {errors?.firstName && (
              <p className="px-1 text-xs text-red-600">
                {errors.firstName.message}
              </p>
            )}
            <Label className="sr-only" htmlFor="lastName">
              Last name
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Last name"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("firstName")}
            />
            {errors?.lastName && (
              <p className="px-1 text-xs text-red-600">
                {errors.lastName.message}
              </p>
            )}
            <Label className="sr-only" htmlFor="firstName">
              Role
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={UserRole.SUPER_ADMIN}>
                    Super admin
                  </SelectItem>
                  <SelectItem value={UserRole.DISTRICT_USER}>
                    District user
                  </SelectItem>
                  <SelectItem value={UserRole.REGIONAL_ADMIN}>
                    Regional admin
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Label className="sr-only" htmlFor="firstName">
              Role
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a district" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {districts.map((district: SchoolDistrict, idx: number) => (
                    <SelectItem key={idx} value={district.name}>
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create user
          </button>
        </div>
      </form>
    </div>
  );
}
