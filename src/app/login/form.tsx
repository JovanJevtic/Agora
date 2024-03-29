'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useState } from "react"
import { FieldValues, useForm } from "react-hook-form";
import { TSLoginSchema, loginFormSchema, registerFormSchema } from "../libs/validation/form";
import { Form as FormComponent, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form'
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Loader2, Wrench } from "lucide-react"
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
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const Form = () =>   {
    const form = useForm<TSLoginSchema>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ''
        },
        mode: 'onTouched'
    });

    const searchParams = useSearchParams()
    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false);
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
        try {
            setLoading(true)
            const res = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password
            })
            setLoading(false);
            if (res?.error) {
                setError("email", {
                    message: "Pogresna lozinka ili email!"
                })
                setError("password", {
                    message: "Pogresna lozinka ili email!"
                })
            } else {
                router.push(searchParams.get("callbackUrl") || "/");   
            }
        } catch (error: any) {
          setLoading(false);
          setError("email", {

          });
        }
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-[70vh]">
            <Card className="max-[800px]:w-[96%] min-[800px]:w-[750px] border-secondary max-[420px]:shadow-none max-[420px]:border-none max-[420px]:bg-transparent">
                <CardHeader>
                    <CardTitle>Prijava</CardTitle>
                    <CardDescription className="max-[800px]:text-xs">Prijavi se ako vec imas racun ili nastavi sa Google-om. <br></br>
                        <Link className="underline mt-1 max-[800px]:text-xs font-bold text-black dark:text-white md:text-primary" href={'/register'}>Nemas račun? Registruj se</Link>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FormComponent {...form}>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                        <Button className="mt-5 w-full font-bold" disabled={isSubmitting || isLoading } type="submit" variant={"default"}>
                            {
                                (isSubmitting || isLoading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            }
                            Prijavi se
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
                    className="w-full mt-2 border-gray-600 border-solid border-[1px] h-10]"
                    onClick={() => {
                        signIn("google")
                    }}
                    variant={"outline"}
                    // disabled
                >
                    <FcGoogle className="w-[50px] h-[22px]" />
                            <p className="">Nastavi uz Google</p>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default Form