import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "@/lib/validations/user";

export async function POST(req: NextRequest) {
  const json = await req.json();
  const body = userSchema.parse(json);

  try {
    const response = await clerkClient.users.createUser({
      firstName: body.firstName,
      lastName: body.lastName,
      emailAddress: [body.email],
      privateMetadata: {
        regionalOfficeId: body.regionalOffice,
        schoolDistrictId: body.district,
      },
    });

    if (!response.id) {
      return NextResponse.json(null, { status: 400 });
    }

    return NextResponse.json({ id: response.id }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(null, { status: 500 });
  }
}
