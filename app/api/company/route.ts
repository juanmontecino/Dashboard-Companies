import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    // Chequea si el cuerpo de la solicitud está vacío
    if (req.body === null) {
      return new NextResponse("Empty request body", { status: 400 });
    }

    const data = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Validación de campos requeridos
    if (!data?.name || !data?.country || !data?.cif) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const company = await db.company.create({
      data: {
        userId,
        ...data,
      },
    });

    return NextResponse.json(company);

  } catch (error) {
    // Convierte el error a un mensaje seguro
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Unknown error occurred";
    
    console.error("[COMPANY_POST]", errorMessage); // Log seguro
    return new NextResponse("Internal error", { status: 500 });
  }
}