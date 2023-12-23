'use client'

import Hamburger from 'hamburger-react'
import { useEffect, useState } from 'react'
import { links } from './Nav/Nav'
import NavBarLink from './Nav/NavLink'
import { useTheme } from 'next-themes'
import { Skeleton } from './ui/skeleton'

type Props = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const HamburgerMenu: React.FunctionComponent<Props> = ({ isOpen, setOpen }) => {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
    <div className='max-[820px]:absolute h-20 top-0 flex items-center z-[1000]'>
      <div className='bg-slate-50 dark:bg-card rounded-sm'>
        {
          mounted ? 
          <Hamburger hideOutline color={`${(mounted && theme === "dark") ? "white" : "black"}`} direction='right' size={24} toggled={isOpen} toggle={()=> {setOpen(!isOpen)}} />
          :
          <div className="flex flex-col justify-between w-full h-full p-3">
            <Skeleton className='h-[2px] rounded-none w-[24px] mb-[5px]'/>
            <Skeleton className='h-[2px] rounded-none w-[24px] mb-[5px]'/>
            <Skeleton className='h-[2px] rounded-none w-[24px] mb-[5px]'/>
          </div>
          
        }
      </div>
    </div>
      <div className='bg-white dark:bg-black' style={{ position: 'absolute', width: '100%',height: '100vh', display: isOpen ? "block" : "none", left: 0,  zIndex: 100, top: 0}}>
        <div className='flex h-full w-full items-center justify-center'>
          <ul className='flex flex-col h-[70%] w-full items-center justify-around'>
            {
              links.map(link => <NavBarLink key={link.route} setIsOpen={setOpen} isOpen={isOpen} link={link} />)
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default HamburgerMenu