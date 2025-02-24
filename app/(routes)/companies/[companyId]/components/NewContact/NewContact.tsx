"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FormContact } from "./FormContact";

export function NewContact() {
    const [open, setOpen] = useState(false);
    
    return (
    <Dialog open={open} onOpenChange={setOpen}>

        <DialogTrigger asChild>
            <Button variant="outline">New Contact</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
                <DialogTitle>New Contact</DialogTitle>
                <DialogDescription>
                    Add a new contact to your company
                </DialogDescription>
            </DialogHeader>
            <FormContact setOpen={setOpen} />
        </DialogContent>

    </Dialog>
  )
}
