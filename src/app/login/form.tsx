'use client'

import { signIn } from "next-auth/react";
import { useState } from "react"
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import { Button } from "../components/ui/button";
import { useForm } from 'react-hook-form'
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { loginFormSchema } from "../libs/validation/form";

type LoginFormData = {
    email: string;
    password: string;
}

const Form = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isLoading },
        reset,
        getValues
    } = useForm();

    return (
       <>
        <form>
            <h1>Login</h1>
            <input 
                {
                    ...register('email')
                }
                type="email" 
                name="email"
                placeholder="email.."
                className="text-black"
            />
            <input 
                {
                    ...register('password')
                }
                type="password"
                name="password"
                placeholder="password..."
                className="text-black"
            />
            {/* <button type="submit">Login</button> */}
            <Button type="submit">Login</Button>
        </form>
        <button onClick={() => {signIn("google")}}>Google</button>
        </>
    )
}

export default Form