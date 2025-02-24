"use client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UploadButton } from "@/utils/uploadthing"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FormCreateCustomerProps } from "./FormCreateCustomer.types"
import { toast } from "sonner"
import axios from "axios"
import { useRouter } from "next/navigation"


const formSchema = z.object({
    name : z.string(),
    country: z.string().min(2),
    website : z.string().min(2),
    phone : z.string().min(6), 
    cif : z.string().min(6),
    profileImage : z.string()
})

export function FormCreateCustomer(props: FormCreateCustomerProps) {
    const {setOpenModalCreate} = props
    const router = useRouter()
    const [photoUploaded, setPhotoUploaded] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        country: "",
        website: "",
        phone: "",
        cif: "",
        profileImage: "",
    },
  })
 
    const {isValid} = form.formState


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          await axios.post("/api/company", values); // Añade await
          toast.success("Company created"); // Usa toast.success para feedback claro
          router.refresh();
          setOpenModalCreate(false);
        } catch(error) {
          toast.error("Error creating company" + error); // Usa toast.error
        }
      };
      

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-3">

            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Company name</FormLabel>
                    <FormControl>
                        <Input placeholder="Company name.." type="text"{...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>

                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                            </FormControl>

                            <SelectContent>
                                <SelectItem value="brazil">Brazil</SelectItem>
                                <SelectItem value="usa">Usa</SelectItem>
                                <SelectItem value="france">France</SelectItem>
                                <SelectItem value="germany">Germany</SelectItem>
                                <SelectItem value="italy">Italy</SelectItem>
                            </SelectContent>

                        </Select>
                    <FormMessage />
                </FormItem>
            )}
            />

            <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Website</FormLabel>
                            <FormControl>
                                <Input placeholder="www.linkedin.com" type="text"{...field} />
                            </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Phone</FormLabel>
                        <FormControl>
                            <Input placeholder="+54 291 555555" type="text"{...field} />
                        </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="cif"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>CIF</FormLabel>
                        <FormControl>
                            <Input placeholder="B-451289" type="text"{...field} />
                        </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Phofile Image</FormLabel>
                        <FormControl>
                            {photoUploaded ? (
                                <p className="text-sm">Image Uploaded!</p>
                            ): (
                            <UploadButton className="bg-slate-600/20 text-slate-800 rounded-lg outline-dotted outline-3"
                            {...field} 
                            endpoint="profileImage"
                            onClientUploadComplete={(res) => {
                                if (res && res.length > 0) {
                                  const imageUrl = `https://utfs.io/f/${res[0].key}`; // Usa key + CDN
                                  form.setValue("profileImage", imageUrl);
                                  setPhotoUploaded(true);
                                  toast.success("Photo uploaded!");
                                }
                              }}
                              onUploadError={(error: Error) => {
                                toast.error("Upload failed: " + error.message);
                              }}
                            
                            />
                        )}
                        </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

        </div>
        <Button type="submit" disabled={!isValid}>Submit</Button>
      </form>
    </Form>
  )
}
