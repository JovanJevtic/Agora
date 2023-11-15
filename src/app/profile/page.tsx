import { getServerSession } from 'next-auth'
import React from 'react'
import { Button } from '../components/ui/button';
import LogOutBtn from '../components/LogOutBtn/LogOutBtn';

const Profile = async () => {
    const session = await getServerSession();

    return (
    <div className='container'>
        <h1>{session?.user?.name}</h1>
        <LogOutBtn />
    </div>
  )
}

export default Profile  