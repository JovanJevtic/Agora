'use client'

import Hamburger from 'hamburger-react'
import { useState } from 'react'
import { links } from './Nav/Nav'
import NavBarLink from './Nav/NavLink'

const HamburgerMenu = () => {
    const [isOpen, setOpen] = useState(false)

  return (
    <>
      <Hamburger hideOutline  color='#fafafa' direction='right' size={24} toggled={isOpen} toggle={()=> {setOpen(!isOpen)}} />
      <div style={{ position: 'absolute', width: '100%',height: '100vh', background: '#000', display: isOpen ? "block" : "none", left: 0 }}>
        <div className='flex h-full w-full items-center justify-center'>
          <ul className='flex flex-col h-[70%] w-full items-center justify-around'>
            {
              links.map(link => <p key={link.name}><NavBarLink key={link.route} link={link} /></p>)
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default HamburgerMenu