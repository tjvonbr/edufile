import { s3BucketName, s3BucketRegion } from "@/lib/consts";
import { s3 } from "@/services/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/services/prisma.ts";
import { ComplianceRequirementStatus } from "@prisma/client";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file: any = formData.get("file");
  const requirementId: any = formData.get("requirementId");

  if (!file || !requirementId) {
    return NextResponse.json({ error: "Missing form data." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const params = {
    Bucket: s3BucketName as string,
    Key: file.name as string,
    Body: buffer,
    ContentType: "application/pdf",
  };

  const command = new PutObjectCommand(params);

  try {
    await s3.send(command);

    await prisma.districtComplianceRequirements.update({
      where: {
        id: requirementId,
      },
      data: {
        attachmentUrl: `https://${s3BucketName}.s3.${s3BucketRegion}.amazonaws.com/${file.name}`,
        status: ComplianceRequirementStatus.UNDER_REVIEW,
      },
    });

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
