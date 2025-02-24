import Image from "next/image";
import { CompanyInformationProps } from "./CompanyInformation.types";
import { User } from "lucide-react";
import { CompanyForm } from "../CompanyForm";
import { NewContact } from "../NewContact";
import { ListContact } from "../ListContact";


export  function CompanyInformation(props : CompanyInformationProps) {
  const { company } = props;

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4 gap-y-4">

      <div className="rounded-lg bg-background shadow-md p-4 hover:shadow-lg">
        <div>
          <Image src={company.profileImage} alt={company.name} width={50} height={50} className="rounded-lg mb-3" />
          <CompanyForm company={company} />
        </div>
      </div>
      
      <div className="rounded-lg bg-background shadow-md p-4 hover:shadow-lg h-min">
        <div className="flex items-center justify-between gap-x-2" >
          <div className="flex items-center gap-x-2" > 
            <User className="w-5 h-5" />
            Contacts
          </div>
          <div>
           <NewContact />
          </div>
        </div>
        <ListContact company={company} />
      </div>
    </div>
  )
}
