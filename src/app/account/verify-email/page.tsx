'use client'

import { verifyJWT } from '@/app/libs/token'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'


const VerifyPage = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    
    const [tokenValue, setTokenValue] = useState<string | null>();

   const getValue = async () => {
        const tokenVal = await verifyJWT(token as string);
        console.log(tokenVal);
    }

   useEffect(() => {
        if (token) getValue()
   }, [])

   useEffect(() => {
    console.log(tokenValue);
   }, [tokenValue])


    return (
        <div>VerifyPage: {token}</div>
    )
}

export default VerifyPage