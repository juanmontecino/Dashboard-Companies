import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export async function ListCompanies() {
  // 1. Obtener userId de forma segura
  const authData = await auth();
  const userId = authData.userId;

  // 2. Redirigir si no hay usuario autenticado
  if (!userId) {
    redirect("/");
  }

  // 3. Consulta con validación de tipos
  const companies = await db.company.findMany({
    where: {
      userId: { equals: userId } // Formato compatible con Prisma
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div>
      <DataTable columns={columns} data={companies} />
    </div>
  );
}