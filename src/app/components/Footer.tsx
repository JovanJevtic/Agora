import React from 'react'

const Footer = () => {
  return (
    <div className='h-32 mt-10' style={{borderTop: '1px', borderColor: '#737373', borderStyle: 'solid'}}>
        <div className='flex mt-3'>
        <p className='text-sm text-gray-400'>Lokacija:</p>
        <p className='text-white text-sm ml-2'>Banjaluka</p>
        </div>
        <div className='flex mt-3'>
        <p className='text-sm text-gray-400'>Kontakt telefon:</p>
        <p className='text-white text-sm ml-2'>+387..</p>
        </div>
    </div>
  )
}

export default Footer