'use client'

import Hamburger from 'hamburger-react'
import { useState } from 'react'

const HamburgerMenu = () => {
    const [isOpen, setOpen] = useState(false)

  return (
    <Hamburger hideOutline  color='#fafafa' direction='right' size={24} toggled={isOpen} toggle={()=> {setOpen(!isOpen)}} />
  )
}

export default HamburgerMenu