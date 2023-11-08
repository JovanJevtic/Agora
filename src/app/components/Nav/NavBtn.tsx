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

    useEffect(() => {
        console.log(session);
    }, [])

    if (status === "authenticated") {
        return(
            <div className='flex items-center ml-5'>
                <Link href={'/profile'} className='flex h-full items-center'>
                    {
                        session.user.image ? <Image className='mr-2' style={{borderRadius: '50%'}} src={session.user.image} height={24} width={24} alt="profile" />
                        :<User2 className='mr-3' />
                    }
                    <p className='text-sm max-[600px]:hidden'>{session.user.name}</p>
                </Link>
                <Button className='h-9 text-xs ml-5' onClick={() => signOut()} variant={"outline"}>Odjavi se</Button>
                {/* <div className='h-6 bg-slate-700 right-0 ml-5' style={{width: '1px'}}></div> */}
            </div>
        )
    }

    if (pathname == '/register') {
        return(
            <div className='flex items-center ml-5'>
                <Link className='max-[780px]:text-xs mr-0' href={'/login'}>
                    <Button className='max-[780px]:text-xs' variant={"outline"}>
                        Prijavi se                
                    </Button>
                </Link>
                
                <Link className='max-[500px]:hidden' href={'/register'}>
                    <Button className='min-[1000px]:mr-3 max-[420px]:w-[90px] max-[780px]:text-xs'>
                        Registruj se                
                    </Button>
                </Link>
            </div>
        )
    }

    return(
        <div className='flex items-center ml-5'>
            <Link className='max-[500px]:hidden' href={'/login'}>
                <Button className='mr-3 max-[780px]:text-xs' variant={"outline"}>
                    Prijavi se                
                </Button>
            </Link>
            
            <Link className='max-[780px]:text-xs' href={'/register'}>
                <Button className='min-[1000px]:mr-3 max-[420px]:w-[90px] max-[780px]:text-xs'>
                    Registruj se                
                </Button>
            </Link>
        </div>
    )
}  

export default NavBtn