'use client'

import { verifyJWT } from '@/app/libs/token'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'

type Token = {
    email: string; 
    tokenCode: number;
    exp: number
}

const VerifyPage = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    
    const [tokenValue, setTokenValue] = useState<Token | null>();
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [responseError, setResponseError] = useState<string | null>(null);

    const getValue = async () => {
        try {
            const tokenVal: Token = await verifyJWT(token as string);
            if (tokenVal) setTokenValue(tokenVal)
        } catch (error) {
            setResponseError("Verifikacioni token istekao, molim Vas pokusajte ponovo!")
        }
    }


    useEffect(() => {
        if (token) getValue()
    }, [])

    useEffect(() => {
        if (tokenValue) {
            axios.post(`http://localhost:3000/api/auth/confirmEmail`, {
                tokenVal: tokenValue,
                token: token
            }).then((res) => {
                setResponseMessage(res.data.msg);
            }).catch((error) => {
                setResponseError(error.response.data.error)
            })
        }   
    }, [tokenValue])

    return (
        <>
            <div>VerifyPage</div>
            {
                responseMessage && <h1>{responseMessage}</h1>
            }
            {
                responseError && <h1>{responseError}</h1>
            }
        </>
    )
}

export default VerifyPage