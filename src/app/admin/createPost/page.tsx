import WriteForm from './form'
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { User } from 'lucide-react';
import Link from 'next/link';
import { Category, Subcategory } from '@prisma/client';

export const getCategorys = async (): Promise<Category[]> => {
  try {
    const res = await fetch('https://www.agoraportal.net/api/posts/category/getAll', {
      cache: 'no-store',
      method: 'GET'
    });
    const data = await res.json()
    return data
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getSubcategorys = async (): Promise<Subcategory[]> => {
  try {
    const res = await fetch('https://www.agoraportal.net/api/posts/subcategory/getAll', {
      method: 'GET',
      next: {
        revalidate: 1
      }
    });
    const data = await res.json()
    console.log('data', data);
    return data
  } catch (error: any) {
    throw new Error(error)
  }
}

const CreatePost = async () => {
  const session = await getServerSession()

  const categorysData: Promise<Category[]> = getCategorys();
  // const subcategorysData: Promise<Subcategory[]> = getSubcategorys();
  
  const categorys = await categorysData;
  // const subcategorys = await subcategorysData;

  return (

    <div className="container">
        <h1 className="font-bold mt-5 mb-5 text-2xl">Započni sa kreiranjem novog članka!</h1>
        <div className=' w-min mb-5'>
          {/* <div className='flex bg-card py-4 pl-4 pr-8 border-solid rounded-md'>
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
          </div>        */}
          <div>
            <Link href={`/profile`} className='flex flex-col bg-card py-4 px-3 lg:px-7 rounded-md'>
              <div className='flex justify-start items-center'>
                <p>Autor: </p>
                <div>
                  <div className='flex items-center pl-3'>
                    <p className='min-w-max font-bold'>{session?.user.name}</p>
                    {
                    session?.user.image ? 
                      <div className='pl-2 min-w-full'><Image className='rounded-[50%]' width={24} height={24} alt='a' src={session.user.image} /> </div>
                    : 
                      <div className='pl-2 min-w-full'><User height={15} width={15} /></div>
                    }
                  </div>
                </div>
              </div>

              <p className='text-gray-500 text-sm mt-0'>{session?.user.email}</p>
            </Link>
          </div>
        </div>   
        <WriteForm 
          categorys={categorys} 
          // subcategorys={subcategorys} 
        />
    </div>
  )
}

export default CreatePost