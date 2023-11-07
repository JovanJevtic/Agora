'use client';

import Link from 'next/link'
import React from 'react'
import { NavLink } from './Nav'
import { usePathname } from 'next/navigation';

type NavBarLinkPropTypes = {
    link: NavLink;
}

const NavBarLink: React.FunctionComponent<NavBarLinkPropTypes> = ({ link }) => {
    const pathname = usePathname()

    return (
    <li>
        <Link 
            href={link.route} 
            key={link.route}
            style={pathname === link.route ? { color: '#fff' } : { color: '#737373' }}
        >
            <p className={`
                text-sm hover:text-white hover:underline underline-offset-8 transition
                ${ link.name === "Novosti" ? "decoration-primary" : link.name === "Sport" ? "decoration-green-500" : link.name === "Kultura" ? "decoration-purple-700" : link.name === "Drustvo" ? "decoration-blue-500" : link.name === "Politika" ? "decoration-orange-500" :  "decoration-white" }
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