import { WrenchIcon } from 'lucide-react'
import React from 'react'

const InProgress = () => {
  return (
    <div className='h-[90vh] w-full flex items-center justify-center flex-col'>
        <h1 className='text-primary'>Servis je u izradi...</h1>
        <WrenchIcon size={30} color='primary' />
    </div>
  )
}

export default InProgress