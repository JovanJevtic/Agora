'use client'

import { Post } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import TrendingNewsDate from '../TrendingNews/TrendingNewsDate';
import { Skeleton } from '../ui/skeleton';
import Image from 'next/image';
import { Category } from '../../../../prisma/generated/client';

type Props = {
    post: Post;
    big: boolean;
}       
const TrendingNewsThumbnail: React.FunctionComponent<Props> = ({ post, big }) => {
    const [category, setCategory] = useState<Category | null>(null);
    const [loadingSub, setLoadingSub] = useState(false);

    const getCategory = async () => {
        try {
            setLoadingSub(true)
            const res = await fetch(`https://www.agoraportal.net/api/posts/category/getById?id=${post.categoryId}`, {
                method: 'GET',
                cache: 'no-cache'
            })
            const data = await res.json();
            setLoadingSub(false)
            if (!data.category) {
                setCategory(null)
            } else {
                setCategory(data.category)
            }
        } catch (error) {
            setCategory(null)
            setLoadingSub(false)
        }
    }

    useEffect(() => {
        getCategory()
    }, [])

    if (!post || !post.image) {
        return (
            <Skeleton className='h-full w-full' />
        )
    }

  return (
    <div className='h-full w-ful'>
    <div className='relative w-full h-full'>
            <Image 
                alt='thumbnail'
                src={post.image}
                layout='fill'
                objectFit='cover'
            />
            <div className="absolute h-full w-full opacity-100 flex flex-col">
                <div className='h-[90%]' style={{ backgroundImage: 'linear-gradient(180deg, transparent, black)' }}></div>
                <div className='bg-black h-[10%]'></div>
            </div>
            <div className='absolute h-full w-full bg-transparent'>
                <div className='h-full w-full pl-3 pr-3 md:pl-5 pb-1 md:pr-5 flex flex-col justify-end'>
                    <h1 className={`mb-0 ml-0 font-bold line-clamp-2
                        text-sm
                        ${ big && 'lg:text-2xl' }
                        ${ !big && 'lg:text-lg' }
                        
                    `}>{post.title}</h1>
                    { big && <p className='text-xs lg:text-sm mb-1 text-gray-400 line-clamp-2'>{post.subtitle}</p> }
                    <div className="flex items-center mt-1">
                        {
                            category ? 
                            <div className="flex mb-0 items-center mt-1">
                                <div className={`h-4 mr-1 w-[1px] ${ category.name === "Novosti" ? "bg-primary" : category.name === "Sport" ? "bg-green-500" : category.name === "Kultura" ? "bg-purple-700" : category.name === "Drustvo" ? "bg-blue-500" : category.name === "Politika" ? "bg-red-500" :  "bg-white" }`}></div>
                                <p className="text-sm max-[700px]:text-xs" 
                                >{category.name}</p>
                            </div>
                            : loadingSub ?
                            <Skeleton className="h-4 w-12" /> : <></>
                        }
                    </div>
                    <p className='md:text-xs text-gray-400 text-xs'><TrendingNewsDate date={post.createdAt} /></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TrendingNewsThumbnail