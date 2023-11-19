'use client'

import Hamburger from 'hamburger-react'
import { useState } from 'react'
import { links } from './Nav/Nav'
import NavBarLink from './Nav/NavLink'
import { useTheme } from 'next-themes'

type Props = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const HamburgerMenu: React.FunctionComponent<Props> = ({ isOpen, setOpen }) => {
  const { setTheme, theme } = useTheme()

  return (
    <>
    <div className='max-[820px]:absolute h-20 top-0 flex items-center z-[1000]'>
      <div className='bg-slate-50 dark:bg-card'>
        <Hamburger hideOutline color={`${theme === "dark" ? "#ffffff" : "#333333"}`} direction='right' size={24} toggled={isOpen} toggle={()=> {setOpen(!isOpen)}} />
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