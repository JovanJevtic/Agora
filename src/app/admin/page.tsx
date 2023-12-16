import React from 'react'
import { Card, CardContent, CardTitle } from '../components/ui/card'
import { PenLine, FolderArchive, Settings } from 'lucide-react'
import Link from 'next/link'

const Admin = () => {
  return (
    <div className='container h-full pt-5 flex justify-center flex-col lg:grid lg:grid-cols-2 lg:gap-5'>
      <Link href={'/admin/createPost'} className='w-full'>
        <Card className='w-full cursor-pointer hover:bg-secondary transition border-secondary'>
          <CardContent className='flex items-center justify-center py-5'>
            <CardTitle className='text-center text-lg font-normal flex items-center'>Dodaj novu objavu <PenLine size={20} className='text-primary ml-3' /></CardTitle>
          </CardContent>
        </Card>
      </Link>
      <Link href={'/admin/subcategorys'} className='w-full mt-5 lg:mt-0'>
        <Card className='w-full cursor-pointer hover:bg-secondary transition border-secondary'>
          <CardContent className='flex items-center justify-center py-5'>
            <CardTitle className='text-center text-lg font-normal flex items-center'>Upravljaj subkategorijama<Settings size={20} className='text-primary ml-3' /></CardTitle>
          </CardContent>
        </Card>
      </Link>
      <Link href={'/admin/archived'} className='w-full mt-5 lg:mt-0'>
        <Card className='w-full cursor-pointer hover:bg-secondary transition border-secondary'>
          <CardContent className='flex items-center justify-center py-5'>
            <CardTitle className='text-center text-lg font-normal flex items-center'>Upravljaj arhiviranim člancima<FolderArchive size={20} className='text-primary ml-3' /></CardTitle>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}

export default Admin