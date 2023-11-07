'use client'

import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"
import { User, UserCircle2Icon, User2 } from 'lucide-react'
import { Button } from '../ui/button';
import Image from 'next/image';

interface NavBarBtnProps {
   
}

const NavBtn: React.FunctionComponent<NavBarBtnProps> = ({  }) => {
    const { data: session, status } = useSession()

    if (status === "authenticated") {
        return(
            <div className='flex items-center ml-5'>
                <Link href={'/profile'} className='flex h-full items-center'>
                    {
                        session.user.image ? <Image className='mr-2' style={{borderRadius: '50%'}} src={session.user.image} height={24} width={24} alt="profile" />
                        :<User2 className='mr-3' />
                    }
                    <p className='text-sm'>{session.user.name}</p>
                </Link>
                <Button className='h-9 text-xs ml-5' onClick={() => signOut()} variant={"outline"}>Odjavi se</Button>
                {/* <div className='h-6 bg-slate-700 right-0 ml-5' style={{width: '1px'}}></div> */}
            </div>
        )
    }

    return(
        <div className='flex items-center ml-5'>
            <Button className='mr-3' variant={"outline"}>
                <Link href={'/login'}>Prijavi se</Link>
            </Button>
            <Button>
                <Link href={'/register'}>Registruj se</Link>
            </Button>
        </div>
    )
}  

export default NavBtn