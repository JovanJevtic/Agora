import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { PlusCircleIcon } from 'lucide-react'
import Link from 'next/link'

const Admin = () => {
  return (
    <div className='container h-full pt-5 max-[600px]:justify-center max-[600px]:flex'>
      <Link href={'/admin/createPost'}>
        <Card className='w-[220px] cursor-pointer hover:bg-black transition'>
          <CardHeader className='flex items-center justify-center'>
            <CardTitle className='text-center'>Dodaj novu objavu</CardTitle>
          </CardHeader>
          <CardContent className='flex items-center justify-center'>
            <CardDescription>
              <PlusCircleIcon size={40} color='green' />
            </CardDescription>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}

export default Admin