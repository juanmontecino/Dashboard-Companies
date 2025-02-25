import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { companyId: string } }
) {
  try {
    const { userId } = await auth();
    const data = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });

    }
    const { companyId } = params;

    const company = await db.company.findUnique({
      where: {
        id: companyId,
        userId,
      },
    });

    if (!company) {
      return new NextResponse("Company not found", { status: 404 });
    }

    const contact = await db.contact.create({
      data: {
        companyId: params.companyId,
        ...data,
      },
    });

    return NextResponse.json(contact);

    } catch (error) {
        const errorMessage =
        error instanceof
        Error ? error.message : "Unknown error occurred";
        console.error("[CONTACT_POST]", errorMessage); // Log seguro
        return new NextResponse("Internal error", { status: 500 });
        }
}

