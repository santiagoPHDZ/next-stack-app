"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { user } from '@prisma/client';
import { Button } from '../ui/button';
import { updateUserSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import Indicator from "../indicator";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useUploadThing } from '@/lib/uploadthing';
import { apiClient } from '@/trpc/trpc-provider';
import { Input } from '../ui/input';
import Dropzone from '../dropzone';
import { useToast } from '../ui/use-toast';

const EditUserForm = ({ user }: { user: user }) => {

    const { toast } = useToast()

    const [isUploading, setIsUploading] = useState(false)

    const form = useForm<z.infer<typeof updateUserSchema>>({
        resolver: zodResolver(updateUserSchema)
    })

    async function onSubmit(data: z.infer<typeof updateUserSchema>) {

        setIsUploading(true)

        let imageUrl: string | undefined
        const file = data.file as File
        if (file) {

            const res = await startUpload([file])

            if (!res) {
                console.log('Something went wrong uploadthing')
                toast({
                    title: "Hubo un error al cambiar la imagen",
                    description: "Intentalo de nuevo mas tarde"
                })
            }

            const response: string[] = res!.map((r) => {
                return r.serverData.url
            })

            imageUrl = response[0]
        }


        const mutateData = {
            firstName: data.firstName,
            lastName: data.lastName,
            imageUrl: imageUrl
        }

        setIsUploading(false)
        mutate(mutateData)
    }

    const { mutate, isLoading, isError, isSuccess } = apiClient.user.update.useMutation({
        onError: (error) => {
            toast({
                title: "Ups.. Algo salio mal",
                description: `Intentalo de nuevo mas tarde, ${error.message}`
            })
        }
    })

    const { startUpload } = useUploadThing("uploadImage")

    if (isLoading || isUploading) {
        return (
            <Indicator status="loading" />
        )
    }

    if (isSuccess) {
        return (
            <Indicator status="success" />
        )
    }

    if (isError) {
        return (
            <Indicator status="error" />
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                                <Input defaultValue={user.firstName} placeholder="First name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                                <Input defaultValue={user.lastName} placeholder="Last name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                                <Dropzone onDrop={(files) => {
                                    console.log('onDrop called:', files);
                                    const file = files[0]
                                    field.onChange(file)
                                }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button disabled={isLoading || isUploading} type="submit" variant="destructive">
                    Update
                </Button>
            </form>
        </Form>
    )
}

export default EditUserForm;