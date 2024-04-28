"use client";

import { useState } from "react";
import { Icons } from "../ui/icons";
import { ComplianceRequirementStatus, User, UserRole } from "@prisma/client";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { requirementStatusMap } from "@/lib/consts";
import Link from "next/link";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

interface RequirementCardProps {
  requirement: any;
  user: User;
}

export function RequirementCard({ requirement, user }: RequirementCardProps) {
  const [file, setFile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  function handleReqStatus() {
    if (
      requirement.status === ComplianceRequirementStatus.INCOMPLETE ||
      requirement.status === ComplianceRequirementStatus.REJECTED
    ) {
      return "destructive";
    } else if (
      requirement.status === ComplianceRequirementStatus.UNDER_REVIEW
    ) {
      return "warning";
    } else if (requirement.status === ComplianceRequirementStatus.APPROVED) {
      return "success";
    } else {
      return "default";
    }
  }

  function handleChange(e: any) {
    setFile(e.target.files[0]);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("requirementId", requirement.id);

    const response = await fetch("http://localhost:3000/api/documents", {
      method: "POST",
      body: formData,
    });

    setIsLoading(false);

    if (!response.ok) {
      toast({
        title: "Something went wrong.",
        description:
          "We couldn't upload your document.  Please try again later.",
        variant: "destructive",
      });
    }

    toast({
      title: "Success!",
      description: "We've received your attachment for this requirement.",
    });

    router.refresh();
  }

  return (
    <div
      className="h-[75px] px-4 flex justify-between items-center rounded-md border duration-100 ease-in-out hover:shadow-[0_2px_7px_rgb(0,0,0,0.12)]"
      key={requirement.id}
    >
      <div className="flex space-x-4">
        <p className="text-xl font-semibold">
          {requirement.complianceRequirement.name}
        </p>
        <Badge variant={handleReqStatus()}>
          {
            requirementStatusMap[
              requirement.status as keyof typeof ComplianceRequirementStatus
            ]
          }
        </Badge>
      </div>
      {requirement.attachmentUrl && (
        <Link
          className="w-1/4 text-[#0000FF] truncate text-xs"
          href={requirement.attachmentUrl}
        >
          {requirement.attachmentUrl}
        </Link>
      )}
      {user.role === UserRole.DISTRICT_USER && !requirement.attachmentUrl && (
        <div className="flex space-x-2">
          <form action="submit">
            <Input
              className="hover:cursor-pointer"
              onChange={handleChange}
              type="file"
            />
          </form>
          {user.role === UserRole.DISTRICT_USER && file && (
            <button
              onClick={handleSubmit}
              className="flex justify-center items-center px-2.5 border rounded-md"
            >
              {isLoading ? (
                <Icons.spinner className="h-4 w-4 animate-spin" />
              ) : (
                <Icons.check size={15} />
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
