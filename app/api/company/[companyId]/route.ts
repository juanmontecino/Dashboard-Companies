import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(req: Request, { params }: { params: { companyId: string } }) {
  try {
 
    const authData = await auth();
    const userId = authData.userId;
    const { companyId } = await params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const company = await db.company.update({
        where : {
            id: companyId,
            userId
        },
        data: {
            ...values,
      },
    });

    return NextResponse.json(company);

  } catch (error) {
    // Convierte el error a un mensaje seguro
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Unknown error occurred";
    
    console.error("[COMPANY_PATCH]", errorMessage); // Log seguro
    return new NextResponse("Internal error", { status: 500 });
  }
}