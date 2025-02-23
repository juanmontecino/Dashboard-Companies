"use client"
import { ArrowUpDown, MoveHorizontal, Pencil } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Company } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { DropdownMenu , DropdownMenuContent, DropdownMenuItem , DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Image from "next/image"


export const columns: ColumnDef<Company>[] = [
    {
      accessorKey: "profileImage",
      header: "Profile Image",
      cell: ({ row }) => {
        const image = row.getValue("profileImage") as string

        return (
            <div className="px-3">
                <Image src={typeof image  === "string" ? image : "/images/Stripe.png"} 
                alt="image" width={40} height={40} className="h-auto w-auto" /> 

            </div>
        )
      },
    },
    {
      accessorKey: "name",
      header: ({column}) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Company Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      }
    },
    {
      accessorKey: "cif",
      header: "CIF",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "country",
        header: "Country",
    },
    {
        accessorKey: "website",
        header: "website",
    },
    {
        id: "actions",
        header: "actions",
        cell: ({ row }) => {
            const {id} = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger >
                        <Button variant="ghost" className="h-4 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoveHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link href={`/company/${id}`}>                           
                            <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" />
                                edit
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
    }},
]