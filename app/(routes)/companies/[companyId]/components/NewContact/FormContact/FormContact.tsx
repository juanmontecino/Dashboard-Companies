"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"

import axios from "axios"


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Select, 
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
 } from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { toast } from "sonner"

import { useParams , useRouter } from "next/navigation"
import { FormContactProps } from "./FormContact.types"
import { formSchema } from "./FormContact.form"

export function FormContact(props : FormContactProps) {

    const { setOpen } = props;

    const params = useParams<{ companyId: string }>();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            role: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/company/${params.companyId}/contact`, values);
            toast.success("Contact created successfully");
            router.refresh();
            setOpen(false);
        } catch (error) {
            toast.error("Something went wrong" + error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="md:grid-cols-2 grid gap-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
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
                                <Input placeholder="Phone" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem> 
                    )}
                />
                <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Comercial"> Comercial </SelectItem>
                                    <SelectItem value="CEO">CEO</SelectItem>
                                    <SelectItem value="Quality">Quality</SelectItem>
                                    <SelectItem value="Analytics"> Analytics</SelectItem>
                                    <SelectItem value="Others">Others</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />

            <Button type="submit">Save Contact</Button>
            </form>
    </Form>
    )
}
