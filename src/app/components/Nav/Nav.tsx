import Link from 'next/link';
import NavLink from './NavLink';
import NavBtn from './NavBtn';
import Image from 'next/image';
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/libs/authOptions';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import { Search } from 'lucide-react'
import { Input } from '../ui/input';
import HamburgerMenu from '../HamburgerMenu';
import NavWrapp from './NavWrapp';

export type NavLink = {
    name: string;
    route: string;
}

export const links: NavLink[] = [
    {
        name: 'Početna',
        route: '/'
    },
    {
        name: 'Novosti',
        route: '/category/Novosti'
    },
    {
        name: 'Politika',
        route: '/category/Politika'
    },
    {
        name: 'Sport',
        route: '/category/Sport'
    },
    {
        name: 'Kultura',
        route: '/category/Kultura'
    },
    {
        name: 'Društvo',
        route: '/category/Društvo'
    },
]

const Nav = async () => {
    // const session = await getServerSession(authOptions);

    return (
        <nav className='h-20 bg-white dark:bg-black fixed w-full border-b-[1px] border-secondary z-[1000] border-solid'>
            <NavWrapp />
        </nav>
  )
}


export default Nav