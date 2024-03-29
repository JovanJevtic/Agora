'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useState } from "react"
import { FieldValues, useForm } from "react-hook-form";
import { TSRegisterSchema, registerFormSchema } from "../libs/validation/form";
import { Form as FormComponent, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form'
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { EyeIcon, Loader2, Wrench } from "lucide-react"
import { FcGoogle } from "react-icons/fc";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"
import { signIn } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert"
import { AlertCircle, MailCheck } from "lucide-react"
import Link from "next/link";
import { FaGoogle } from "react-icons/fa6";
import { BsGoogle } from "react-icons/bs";

const Form = () =>   {
    const form = useForm<TSRegisterSchema>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: "",
            confirmPassword: '',
            name: '',
            password: ''
        },
        mode: 'onTouched'
    });

    const [response, setResponse] = useState<string | null>(null);
    const [resError, setResError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isLoading, isValid },
        reset,
        getValues,
        setError,
    } = form

    const onSubmit = async (data: FieldValues) => {
        const response = await fetch(`/api/auth/register`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        
        const responseData = await response.json();

        if (!response.ok) {
            const errors = responseData.errors;
            if (errors?.email) {
              setError("email", {
                type: "server",
                message: errors.email,
              });
            } else if (errors?.password) {
              setError("password", {
                type: "server",
                message: errors.password,
              });
            } else if (errors?.confirmPassword) {
              setError("confirmPassword", {
                type: "server",
                message: errors.confirmPassword,
              });
            } else {
                setResponse(null)
                setResError("Nesto je poslo po zlu, molimo Vas pokusajte ponovo!");
            }
        } else {
            setResponse("Success")
            setResError(null);
        }
        // reset();
    }

    return (
        <div className="flex flex-col items-center justify-center min-[70vh]">
            <div className="mt-20"></div>
            {
                
                    resError &&
                    <div className="max-[800px]:w-[96%] min-[800px]:w-[750px]">
                         <Alert className="mb-5 bg-background" variant={"destructive"}>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Greska!</AlertTitle>
                        <AlertDescription>
                            Nesto je poslo po zlu..Pokusajte ponovo!
                        </AlertDescription>
                        </Alert>
                    </div>
            }
            
            {
                    response && <div className="max-[800px]:w-[96%] min-[800px]:w-[750px]"><Alert className="mb-5 bg-background border-primary" variant={"default"}>
                    <MailCheck className="h-4 w-4" />
                    <AlertTitle>Uspjesno!</AlertTitle>
                    <AlertDescription>
                        Provjerite Vaše email sanduce i verifikujte se!
                    </AlertDescription>
                    </Alert></div>
            }

            <Card className="max-[800px]:w-[96%] min-[800px]:w-[750px] border-secondary max-[420px]:shadow-none max-[420px]:border-none max-[420px]:bg-transparent">
                <CardHeader>
                    <CardTitle>Registracija</CardTitle>
                    <CardDescription className="max-[800px]:text-xs">Registruj se uz pomoc Google ili manuelno uz e-mail adresu.<br></br>
                        <Link className="underline mt-1 max-[800px]:text-xs font-bold text-black dark:text-white md:text-primary" href={'/login'}>Vec imas račun? Prijavi se</Link></CardDescription>
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
                                    <Input  type="password" placeholder="Lozinka.." {...field} />
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
                        <Button 
                            className="mt-5 w-full font-bold" 
                            // disabled={isSubmitting || isLoading || !isValid } 
                            type="submit" variant={"default"}
                        >
                            {
                                (isSubmitting || isLoading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            }
                            Registruj se
                        </Button>
                    </form>
                </FormComponent>
                <div className="w-full flex justify-center">
                    <div className="h-10 flex items-center mt-2" style={{width: '98%'}}>
                        <div className="bg-zinc-600" style={{height: '1px', flex: '5'}}></div>
                        <div className="flex-1 flex items-center justify-center">
                            <p className="text-zinc-600" style={{fontSize: '16px'}}>ili</p>
                        </div>
                        <div className="bg-zinc-600" style={{height: '1px', flex: '5'}}></div>
                    </div> 
                </div> 
                <Button

                    className="w-full mt-2 border-gray-600 border-solid border-[1px]"
                    onClick={() => {
                        signIn("google")
                    }}
                    variant={"outline"}
                    // disabled
                >
                    {/* <Wrench height={16} className="mr-3" /> */}
                            <FcGoogle className="w-[50px] h-[22px]" />
                            <p className="">Nastavi uz Google</p>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default Form