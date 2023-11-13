'use client';

import Link from 'next/link'
import React from 'react'
import { NavLink } from './Nav'
import { usePathname } from 'next/navigation';

type NavBarLinkPropTypes = {
    link: NavLink;
    setIsOpen?: (isOpen: boolean) => void;
    isOpen?: boolean;
}

const NavBarLink: React.FunctionComponent<NavBarLinkPropTypes> = ({ link, setIsOpen, isOpen }) => {
    const pathname = usePathname()

    return (
    <li onClick={() => { if (setIsOpen && isOpen) setIsOpen(!isOpen) }}>
        <Link 
            href={link.route} 
            key={link.route}
            style={pathname === link.route ? { color: '#fff' } : { color: '#737373' }}
        >
            <p className={`
                text-sm hover:text-white hover:underline underline-offset-8 transition
                ${ link.name === "Novosti" ? "decoration-yellow-500" : link.name === "Sport" ? "decoration-green-500" : link.name === "Kultura" ? "decoration-purple-700" : link.name === "Drustvo" ? "decoration-blue-500" : link.name === "Politika" ? "decoration-red-700" :  "decoration-white" }
            `}
            style={{
                textDecorationColor: `${ link.name === "Novosti" ? "yellow" : link.name === "Sport" ? "" : "" }`
            }}
            >{link.name}</p>
        </Link> 
    </li>
  )
}

export default NavBarLink