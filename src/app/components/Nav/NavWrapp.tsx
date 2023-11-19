'use client'

import { Search } from "lucide-react";
import Link from "next/link";
import HamburgerMenu from "../HamburgerMenu";
import Image from "next/image";
import NavBarLink from "./NavLink";
import NavBtn from "./NavBtn";
import { links } from './Nav'
import Logo from '../../../../public/LogoTip-01.png'
import { useState } from "react";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { fraunces } from "@/app/layout";

const NavWrapp = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false); 

    return(
        <div className="container flex w-full h-full items-center">
            <div className='bg-background min-[820px]:hidden'>
                <HamburgerMenu isOpen={isOpen} setOpen={setIsOpen} />
            </div>
            
            <Link
                onClick={() => setIsOpen(false)}
                href={'/search'} className='z-[1000] h-10 rounded-sm flex items-center cursor-pointer min-[820px]:hidden max-[820px]:ml-16 max-[820px]:absolute'
            >
                <Search height={20} />
            </Link>
                
            <div className='min-[820px]:mr-10 flex items-center max-[820px]:flex-1 max-[820px]:justify-center'>
                <Link 
                    onClick={() => setIsOpen(false)}
                    href={'/'} className='flex h-full items-center'
                >
                    <Image src={Logo} alt='logo' height={35} className='z-[1000] md:z-[1] mr-1' />
                    <p className={`text-sm font-bold ml-1 max-[480px]:hidden z-[1000] md:z-[1]`}>Agora</p>
                </Link>
                
            <div className='h-[18px] bg-[#333] right-0 ml-5 max-[820px]:hidden' style={{width: '1px'}}></div>
            </div>
            
            <div className='flex-1 max-[820px]:hidden'>
                <ul className='flex justify-between min-[1000px]:mr-20 max-[1000px]:mr-2'>
                    {
                        links.map(link => <NavBarLink key={link.route} link={link} />)
                    }
                </ul>
            </div>
            
                {/* <DarkModeToggle /> */}

            <div className="hidden md:block mr-3">
                <DarkModeToggle />
            </div>
            
            <div className='h-full flex items-center max-[1000px]:hidden'>
                <Link href={'/search'} className='h-10 bg-secondary w-44 rounded-sm flex items-center cursor-pointer'>
                    <Search height={14} className='ml-2' />
                    <p className='text-xs ml-2'>Pretražuj..</p>
                </Link>
            </div>

                
            <Link href={'/search'} className='h-10 rounded-sm flex items-center cursor-pointer hidden'>
                    <Search height={18} />
            </Link>

            <div className="absolute right-[65px] z-[1000] md:z-[1] md:hidden">
                <DarkModeToggle />
            </div>
                
            <div className="relative h-full min-[820px]:ml-5">
                <div className='right-0 max-[820px]:absolute flex items-center h-full w-full justify-end'>
                    <NavBtn setOpen={setIsOpen} />
                </div>
            </div>
        </div> 
    );
}   

export default NavWrapp