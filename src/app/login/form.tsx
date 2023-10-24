'use client'

import { useState } from "react"

type LoginFormData = {
    email: string;
    password: string;
}

const Form = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        })
    }

    return (
        <form>
            <h1>Login</h1>
            <input 
                type="email" 
                name="email"
                placeholder="email.."
                onChange={handleChange}
            />
            <input 
                type="password"
                name="password"
                placeholder="password..."
                onChange={handleChange}
            />
            <button type="submit">Login</button>
        </form>
    )
}

export default Form