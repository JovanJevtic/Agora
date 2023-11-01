import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const registerFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Lozinka mora biti najmanje 8 karaktera dugacka!"),
    confirmPassword: z.string(),
    name: z.string().min(3)
}).refine(data => data.password === data.confirmPassword, { 
  message: 'Lozinke se moraju poklapati!',
  path: ['confirmPassword']
})

export type TSRegisterSchema = z.infer<typeof registerFormSchema>;
export type TSLoginSchema = z.infer<typeof loginFormSchema>;