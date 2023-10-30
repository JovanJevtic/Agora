'use client'

import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"

interface NavBarBtnProps {
   
}

const NavBtn: React.FunctionComponent<NavBarBtnProps> = ({  }) => {
    const { data: session, status } = useSession()

    return(
        status === "authenticated" ? 
            <button
                onClick={() => {signOut()}}
                id='nav-btn'
                style={{ backgroundColor: '#96160e' }}
            >Odjavi se</button>
            :
            <div style={{ display: 'flex', height: '100%' }}>
                <Link
                    className='nav-btn'
                    href={'/login'}
                >Prijavi se</Link>
                <Link 
                    href={'/register'}
                    className='nav-btn'
                    id='nav-btn'
                    style={{ marginLeft: '10px', paddingLeft: '15px', paddingRight: '15px' }}
                >
                    Registruj se
                </Link>
            </div>
        
    )
}  

export default NavBtn