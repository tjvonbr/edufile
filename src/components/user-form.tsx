"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { userSchema } from "@/lib/validations/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Form } from "./ui/form";
import { RegionalOffice, SchoolDistrict, UserRole } from "@prisma/client";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Icons } from "./ui/icons";
import { redirect, useRouter } from "next/navigation";

interface UserForm extends React.HTMLAttributes<HTMLDivElement> {
  districts: SchoolDistrict[];
  regionalOffices: RegionalOffice[];
}

type FormData = z.infer<typeof userSchema>;

export function UserForm({
  districts,
  regionalOffices,
  className,
  ...props
}: UserForm) {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
    },
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const router = useRouter();

  const role = form.watch("role");

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        district: data.district,
        regionalOffice: data.regionalOffice,
      }),
    });

    setIsLoading(false);

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description:
          "We weren't able to create a user record.  Please try again.",
      });
    }

    toast({
      title: "Success!",
      description: `We successfully created an account for ${data.firstName}!`,
    });

    router.push("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Dewey" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role for this user" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={UserRole.SUPER_ADMIN}>
                    Super Admin
                  </SelectItem>
                  <SelectItem value={UserRole.DISTRICT_USER}>
                    District User
                  </SelectItem>
                  <SelectItem value={UserRole.REGIONAL_ADMIN}>
                    Regional Admin
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        {role === UserRole.DISTRICT_USER && (
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>District</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a district for this user" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {districts &&
                      districts.length > 0 &&
                      districts.map((district: SchoolDistrict, idx: number) => {
                        return (
                          <SelectItem key={idx} value={district.id}>
                            {district.name}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        )}
        {role === UserRole.REGIONAL_ADMIN && (
          <FormField
            control={form.control}
            name="regionalOffice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Regional Office</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a regional office for this user" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {regionalOffices &&
                      regionalOffices.length > 0 &&
                      regionalOffices.map(
                        (office: RegionalOffice, idx: number) => {
                          return (
                            <SelectItem key={idx} value={office.id}>
                              {office.name}
                            </SelectItem>
                          );
                        }
                      )}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        )}
        <Button className="w-full" type="submit">
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
