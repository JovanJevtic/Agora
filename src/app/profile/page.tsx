import { getServerSession } from 'next-auth'
import React from 'react'
import { Button } from '../components/ui/button';
import LogOutBtn from '../components/LogOutBtn/LogOutBtn';
import Link from 'next/link';
import { authOptions } from '../libs/authOptions';
import Image from 'next/image';
import { User } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

const Profile = async () => {
    const session = await getServerSession(authOptions);

    return (
    <div className='container flex items-center justify-center h-[70vh] w-full'>
        <Card className='border-secondary w-[200px]'>
          <CardContent className='p-5'>
            <div className='flex w-full mb-5 flex-col items-center'>
              <div className='h-[40px] w-[40px] flex items-center justify-center bg-slate-50 dark:bg-black rounded-[50%] mb-1'>
                {
                  session?.user.image ?
                  <Image
                    src={session.user.image}
                    alt='profile'
                    height={24}
                    width={24}
                  />
                  :
                  <User height={24} width={24} />
                }
              </div>
              <h1 className='font-bold'>{session?.user?.name}</h1>
            </div>
            {
              session?.user.role === "admin" && 
              <div className='w-full'>
                <Link className='w-full' href={'/admin'}><Button className='w-full' variant={'default'}>Admin</Button></Link>
              </div>
            }

            <div className='w-full mt-3'>
              <LogOutBtn classnames='w-full' />
            </div>
          </CardContent>
        </Card>
    </div>
  )
}

export default Profile  