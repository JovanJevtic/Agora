'use client'

import Hamburger from 'hamburger-react'
import { useState } from 'react'

const HamburgerMenu = () => {
    const [isOpen, setOpen] = useState(false)

  return (
    <>
      <Hamburger hideOutline  color='#fafafa' direction='right' size={24} toggled={isOpen} toggle={()=> {setOpen(!isOpen)}} />
      <div style={[{ position: 'absolute', width: '100%',height: '100vh', background: 'red' }, isOpen ? {display: 'block'} : {display: 'none'}]}></div>
    </>
  )
}

export default HamburgerMenu