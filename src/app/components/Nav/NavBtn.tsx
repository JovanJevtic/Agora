'use client'

import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"
import { User, UserCircle2Icon } from 'lucide-react'
import { Button } from '../ui/button';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { SetStateAction, useEffect } from 'react';

type NavBarBtnProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const NavBtn: React.FunctionComponent<NavBarBtnProps> = ({ setOpen }) => {
    const { data: session, status } = useSession()
    const pathname = usePathname()

    if (status === "authenticated") {
        return(
            <div className=''>
                <Link href={'/profile'} className=''>
                    {
                        session?.user?.image ? <Image className='rounded-[50%]' alt='profile' src={session.user.image} height={24} width={24} />
                        : <UserCircle2Icon className='mr-0' />
                    }
                </Link>
            </div>
        )
    }

    // if (pathname == '/register') {
    //     return(
    //         <div className='flex items-center ml-5'>
    //             <Link className='rounded-md mr-0' href={'/login'}>
    //                 <Button className='min-[1000px]:mr-3 max-[420px]:w-[80px] max-[420px]:h-[32px] max-[420px]:text-[11px]' variant={"outline"}>
    //                     Prijavi se
    //                 </Button>
    //             </Link>
    //         </div>
    //     )
    // }

    return(
        <div className='flex items-center justify-end'>
            <Link 
                className='rounded-md' href={`${pathname === '/register' ? '/login' : '/register'}`}
                onClick={() => setOpen(false)}    
            >
                {
                    pathname === '/register' ? 
                        <Button className='hidden md:block max-[420px]:h-[32px] max-[420px]:text-[11px]'>
                            Prijavi se                
                        </Button>
                        :
                        <Button className='hidden md:block max-[420px]:h-[32px] max-[420px]:text-[11px]'>
                            Registruj se                
                        </Button>
                }
                <div className='md:hidden w-full h-full flex justify-end items-center mr-0'>
                   {/* <div className='flex items-center justify-center rounded-[50%] h-[38px] w-[38px] bg-slate-50 dark:bg-card z-[1000]'>
                        <UserCircle2Icon className='' size={20} />
                   </div> */}
                   <UserCircle2Icon className='mr-0' size={24} />
                </div>
            </Link>
        </div>
    )
}  

export default NavBtn