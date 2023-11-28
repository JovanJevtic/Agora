import { serialize } from 'next-mdx-remote/serialize';
import WriteForm from './form'
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { User } from 'lucide-react';
import Link from 'next/link';
import { Category, Subcategory } from '@prisma/client';

export const getCategorys = async () => {
  const res = await fetch('https://www.agoraportal.net/api/posts/category/getAll', {
    cache: 'no-cache',
    method: 'GET'
  });
  const data = await res.json()
  return data
}

export const getSubcategorys = async () => {
  const res = await fetch('https://www.agoraportal.net/api/posts/subcategory/getAll', {
    cache: 'no-cache',
    method: 'GET'
  });
  const data = await res.json()
  return data
}

const CreatePost = async () => {
  const session = await getServerSession()

  const categorysData: Promise<Category[]> = getCategorys();
  const subcategorysData: Promise<Subcategory[]> = getSubcategorys();
  
  const categorys = await categorysData;
  const subcategorys = await subcategorysData;

  return (

    <div className="container">
        <h1 className="font-bold mt-5 mb-5 text-2xl">Započni sa kreiranjem novog članka!</h1>
        <div className=' w-min mb-5'>
          <div className='flex bg-card py-4 pl-4 pr-8 border-solid rounded-md'>
            <p className='text-gray-400 text-sm'>Autor: </p>
            <Link href={`/profile`} className='flex h-full'>
              {
                session?.user.image ? 
                  <Image className='rounded-full ml-5' width={24} height={24} alt='a' src={session.user.image} /> 
                : 
                  <User height={15} width={15} />
              }
              <p className='font-bold text-white pl-2 text-sm pr-6'>{session?.user.name}</p>
            </Link>
          </div>       
        </div>   
        <WriteForm categorys={categorys} subcategorys={subcategorys} />
    </div>
  )
}

export default CreatePost