import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import { Header } from "./components/Header";
import { CompanyInformation } from "./components/CompanyInformation";
import { FooterCompany } from "./components/FooterCompany";

export default async function CompanyIdPage({
  params,
}: {
  params: { companyId: string };
}) {
  // 1. Desestructuración segura de params
  const { companyId } = await params;

  // 2. Autenticación
  const { userId } = await auth();
  
  if (!userId) redirect("/");

  // 3. Consulta con validación de parámetros
  const company = await db.company.findUnique({
    where: {
      id: companyId, // Usamos la variable desestructurada
      userId: { equals: userId }
    },
  });

  if (!company) redirect("/");

  return (
    <div>
      <Header/>
      <CompanyInformation company={company}/>
      <FooterCompany companyId={companyId}/> 
    </div>
  );
}