"use client";

import { FooterCompanyProps } from "./FooterCompany.types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Trash } from "lucide-react";
import {toast} from "sonner"

import { Button } from "@/components/ui/button";


export function FooterCompany(props : FooterCompanyProps) {
  const router = useRouter();
  const { companyId } = props;

  const onDeleteCompany = async () => {
    try {
      await axios.delete(`/api/company/${companyId}`);
      toast.success("Company deleted successfully");
      router.push("/companies");
    } catch (error) {
      toast.error("Error deleting company"+error);
    }
  };

  return (
    <div className="flex justify-end mt-5">
      <Button variant="destructive" onClick={onDeleteCompany}>
        <Trash className="w-4 h-4 ml-2" />
        Remove company
      </Button>
    </div>
  )
}
