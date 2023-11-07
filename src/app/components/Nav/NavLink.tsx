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
            <p className='text-sm hover:text-white hover:underline underline-offset-8 transition'>{link.name}</p>
        </Link> 
    </li>
  )
}

export default NavBarLink