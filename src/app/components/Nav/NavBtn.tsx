'use client'

import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"
import { User, UserCircle2Icon, User2 } from 'lucide-react'
import { Button } from '../ui/button';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface NavBarBtnProps {
   
}

const NavBtn: React.FunctionComponent<NavBarBtnProps> = ({  }) => {
    const { data: session, status } = useSession()
    const pathname = usePathname()

    if (status === "authenticated") {
        return(
            <div className='flex items-center ml-5'>
                {/* <Button className='h-9 text-xs ml-5 rounded-md mr-1' onClick={() => signOut()} variant={"outline"}>Odjavi se</Button> */}
                <Link href={'/profile'} className='flex h-full items-center'>
                    <p className='text-sm max-[600px]:hidden'>{session.user.name}</p>
                    {
                        session.user.image ? <Image className='mr-2' style={{borderRadius: '50%'}} src={session.user.image} height={24} width={24} alt="profile" />
                        :<UserCircle2Icon className='mr-3' />
                    }
                </Link>
                {/* <div className='h-6 bg-slate-700 right-0 ml-5' style={{width: '1px'}}></div> */}
            </div>
        )
    }

    if (pathname == '/register') {
        return(
            <div className='flex items-center ml-5'>
                <Link className='rounded-md mr-0' href={'/login'}>
                    <Button className='min-[1000px]:mr-3 max-[420px]:w-[80px] max-[420px]:h-[32px] max-[420px]:text-[11px]' variant={"outline"}>
                        Prijavi se
                    </Button>
                </Link>
            </div>
        )
    }

    return(
        <div className='flex items-center ml-5'>
            <Link className='rounded-md' href={'/register'}>
                <Button className='min-[1000px]:mr-3 max-[420px]:w-[80px] max-[420px]:h-[32px] max-[420px]:text-[11px]'>
                    Registruj se                
                </Button>
            </Link>
        </div>
    )
}  

export default NavBtn