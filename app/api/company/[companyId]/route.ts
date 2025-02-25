import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { companyId: string } }
) {
  try {
    // Obtener el userId usando 
    const { userId } = await auth();

    // Verificar si el usuario está autenticado
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Obtener el companyId de los parámetros de la ruta
    const { companyId } = params;

    // Obtener los valores del cuerpo de la solicitud
    const values = await req.json();

    // Actualizar la compañía en la base de datos
    const company = await db.company.update({
      where: {
        id: companyId,
        userId, // Asegurarse de que solo el usuario propietario pueda actualizar
      },
      data: {
        ...values,
      },
    });

    // Devolver la compañía actualizada
    return NextResponse.json(company);
  } catch (error) {
    // Manejo de errores
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    console.error("[COMPANY_PATCH]", errorMessage); // Log seguro
    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function DELETE(
  req: NextRequest,
  { params }: { params: { companyId: string } }
) {
  try {
    const { userId } = await auth();

    const { companyId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deletedCompany = await db.company.delete({
      where: {
        id: companyId,
      },
    });
  
    return NextResponse.json(deletedCompany);
  } catch (error) {
    console.error("[COMPANY_DELETE]" + error);
     return new NextResponse("Internal error", { status: 500 });
  }
}