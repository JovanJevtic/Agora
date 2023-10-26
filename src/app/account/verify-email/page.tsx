'use client'

import { verifyJWT } from '@/app/libs/token'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'


type Token = {
    email: string; 
    tokenCode: number;
    exp: number
}

const VerifyPage = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    
    const [tokenValue, setTokenValue] = useState<Token | null>();

    const getValue = async () => {
        const tokenVal: Token = await verifyJWT(token as string);
        if (tokenVal) setTokenValue(tokenVal)
    }
    const validate = async () => {
        const res = fetch(`http://localhost:3000/api/auth/confirmEmail`, {
            method: 'POST',
            body: JSON.stringify({
                tokenVal: tokenValue,
                token: token
            })
        })
    }

    useEffect(() => {
        if (token) getValue()
    }, [])

    useEffect(() => {
        if (tokenValue) {
            validate()
        } 
    }, [tokenValue])


    return (
        <div>VerifyPage: </div>
    )
}

export default VerifyPage