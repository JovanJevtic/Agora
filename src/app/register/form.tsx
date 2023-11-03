'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useState } from "react"
import { FieldValues, useForm } from "react-hook-form";
import { TSRegisterSchema, registerFormSchema } from "../libs/validation/form";
import { Form as FormComponent, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form'
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"

const Form = () =>   {
    const form = useForm<TSRegisterSchema>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: "",
            confirmPassword: '',
            name: '',
            password: ''
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isLoading },
        reset,
        getValues,
        setError
    } = form

    const onSubmit = async (data: FieldValues) => {
        const response = await fetch(`/api/auth/register`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        
        const responseData = await response.json();

        if (!response.ok) {
            const errors = responseData.errors;
      
            if (errors.email) {
              setError("email", {
                type: "server",
                message: errors.email,
              });
            } else if (errors.password) {
              setError("password", {
                type: "server",
                message: errors.password,
              });
            } else if (errors.confirmPassword) {
              setError("confirmPassword", {
                type: "server",
                message: errors.confirmPassword,
              });
            } else {
              alert("Something went wrong!");
            }
        }
        // reset();
    }

    return (
        <Card className="w-[750px]">
            <CardHeader>
                <CardTitle>Registracija</CardTitle>
                <CardDescription>Registruj se uz pomoc Google ili manuelno uz e-mail adresu.</CardDescription>
            </CardHeader>
            <CardContent>
                <FormComponent {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="mt-2">
                            <FormControl className="h-12">
                                <Input placeholder="Korisnicko ime..." {...field} />
                            </FormControl>
                            <FormMessage style={{color: 'red'}} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="mt-2">
                                <FormControl className="h-12">
                                    <Input placeholder="Email..." {...field} />
                                </FormControl>
                                <FormMessage style={{color: 'red'}} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="mt-2">
                            <FormControl className="h-12">
                                <Input type="password" placeholder="Lozinka.." {...field} />
                            </FormControl>
                            <FormMessage style={{color: 'red'}} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className="mt-2">
                            <FormControl className="h-12"> 
                                <Input type="password" placeholder="Lozinka.." {...field} />
                            </FormControl>
                            <FormMessage style={{color: 'red'}} />
                            </FormItem>
                        )}
                    />
                    <Button className="mt-5" disabled={isSubmitting || isLoading} type="submit">
                        {
                            (isSubmitting || isLoading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        }
                        Registruj se
                    </Button>
                </form>
            </FormComponent>
            </CardContent>
        </Card>
    )
}

export default Form