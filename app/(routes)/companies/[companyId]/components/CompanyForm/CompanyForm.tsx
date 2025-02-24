"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {z} from "zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"


import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; 
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

import { UploadButton } from "@/utils/uploadthing"
import { CompanyFormProps } from "./CompanyForm.types"
import { formSchema } from "./CompanyForm.form"

export  function CompanyForm( props : CompanyFormProps) {
    const { company } = props;
    const router = useRouter()
    const [photoUploaded , setPhotoUploaded] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: company?.name || "",
            description: company?.description || "",
            country: company?.country || "",
            website: company?.website || "",
            phone: company?.phone || "",
            profileImage : company?.profileImage || "",
            cif: company?.cif || "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/company/${company?.id}`, values);
            toast.success("Company updated");
            router.refresh();
        }
        catch (error) {
            try {
                await axios.patch(`/api/company/${company?.id}`, values);
                toast.success("Company updated");
                router.refresh();
            }catch (error) {
                toast.error("Error updating company" + error);
            }
            toast.error("Error updating company" + error);
        }
    }
  return (
    <div >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> 
                <div className=" grid grid-cols-2 gap-3">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Company name" type="text" {...field} />
                                </FormControl>
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
                                <SelectContent className="bg-background"> {/* Añadir clase de estilo */}
                                    <SelectItem value="es">Spain</SelectItem>
                                    <SelectItem value="en">United Kingdom</SelectItem>
                                    <SelectItem value="fr">France</SelectItem>
                                    <SelectItem value="it">Italy</SelectItem>
                                    <SelectItem value="de">Germany</SelectItem>
                                    <SelectItem value="pt">Portugal</SelectItem>
                                    <SelectItem value="us">United States</SelectItem>
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
                                    <Input placeholder="www.JotaManager.com" type="text" {...field} />
                                </FormControl>
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
                                    <Input placeholder="+54 261 845261" type="number" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                    control={form.control}
                    name="cif"
                    render={({ field }) => (
                            <FormItem>
                                <FormLabel>CIF / NIF</FormLabel>
                                <FormControl>
                                    <Input placeholder="A-451216" type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                    control={form.control}
                    name="profileImage"
                    render={({ field }) => (
                            <FormItem>
                                <FormLabel>Profile image</FormLabel>
                                <FormControl>
                                    <div>
                                        {photoUploaded ? (
                                            <p className="text-sm"> Image Uploaded!</p>
                                        ): (
                                            <UploadButton className="bg-slate-600/20 text-slate-800 rounded-lg outline-dotted outline-3"
                                            {...field} 
                                            endpoint="profileImage"
                                            onClientUploadComplete={(res) => {
                                               const imageUrl = `https://utfs.io/f/${res[0].key}`; // Usa key + CDN
                                               form.setValue("profileImage", imageUrl)
                                               setPhotoUploaded(true)
                                               toast.success("Image uploaded successfully!")
                                            }}
                                            onUploadError={(error) => {
                                                toast.error("Error uploading image!" +  error)
                                            }}
                                            />
                                        )}
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                   <Textarea placeholder="Description... " 
                                   {...field} 
                                   value={ form.getValues().description ?? ""} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" >Edit Company</Button>
            </form>
        </Form>
    </div>
  )
}
