'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useState } from "react"
import { FieldValues, useForm } from "react-hook-form";
import { TSRegisterSchema, registerFormSchema } from "../libs/validation/form";

type RegisterFormData = {
    email: string;
    password: string;
}

const Form = () =>   {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isLoading },
        reset,
        getValues,
        setError
    } = useForm<TSRegisterSchema>({
        resolver: zodResolver(registerFormSchema)
    });

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Register</h1>
            <input
                {
                    ...register("name")
                } 
                type="name" 
                name="name"
                placeholder="name.."
                className="text-black"
            />
            {
                errors.name && (
                    <p className="text-red-500">{`${errors.name.message}`}</p>
                )
            }
            <input
                {
                    ...register("email")
                } 
                type="email" 
                name="email"
                placeholder="email.."
                className="text-black"
            />
            {
                errors.email && (
                    <p className="text-red-500">{`${errors.email.message}`}</p>
                )
            }
            <input 
                {
                    ...register('password')
                }
                type="password"
                name="password"
                placeholder="password..."
                className="text-black"
            />
            {
                errors.password && (
                    <p className="text-red-500">{`${errors.password.message}`}</p>
                )
            }
            <input 
                {
                    ...register('confirmPassword')
                }
                type="password"
                name="confirmPassword"
                placeholder="password..."
                className="text-black"
            />
            {
                errors.confirmPassword && (
                    <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
                )
            }
            <button disabled={isSubmitting} type="submit">Register</button>
        </form>
    )
}

export default Form