'use client'

import { Post } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import TrendingNewsDate from '../TrendingNews/TrendingNewsDate';
import { Skeleton } from '../ui/skeleton';
import Image from 'next/image';
import { Category } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useTheme } from 'next-themes';

type Props = {
    post: Post;
    big: boolean;
}       
const TrendingNewsThumbnail: React.FunctionComponent<Props> = ({ post, big }) => {
    const [category, setCategory] = useState<Category | null>(null);
    const [loadingSub, setLoadingSub] = useState(false);

    const { setTheme, theme } = useTheme()

    const getCategory = async () => {
        try {
            setLoadingSub(true)
            const res = await fetch(`https://www.agoraportal.net/api/posts/category/getById?id=${post.categoryId}`, {
                method: 'GET',
                cache: 'no-cache'
            })
            const data = await res.json();
            setLoadingSub(false)
            if (!res.ok) {
                setCategory(null)
            } else {
                setCategory(data)
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
    <>
        <div className='h-full w-full md:hidden'>
        {
            big ? <div className='relative w-full h-full'>
                <Image 
                    alt='thumbnail'
                    src={post.image}
                    fill
                    style={{objectFit:"cover", objectPosition: 'top'}}
                />
                <div className="absolute h-full w-full opacity-100 flex flex-col">
                    <div className='h-[100%]' style={{ backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.2), black)'}}></div>
                    {/* <div className='bg-black h-[10%]'></div> */}
                </div>
                <div className='absolute h-full container bg-transparent'>
                    <div className='h-full w-full md:pl-5 md:pr-5 flex flex-col justify-end'>
                        <h1 className={`mb-0 ml-0 line-clamp-2
                            text-2xl
                            font-bold
                            md:text-2xl
                            lg:text-3xl
                        text-white
                        `}>{post.title}</h1>
                        { big && <p className='text-xs w-[70%] lg:text-sm mb-2 mt-0.5 text-gray-400  line-clamp-2'>{post.subtitle}</p> }
                        
                        <div className='flex w-full items-center mb-5 mt-2'>
                            <div className="flex items-center mt-0.5 flex-1">
                                {
                                    category ? 
                                    <div className="flex mb-0 items-center mt-0">
                                        <div className={`h-4 mr-1 w-[1px] ${ category.name === "Novosti" ? "bg-yellow-500" : category.name === "Sport" ? "bg-green-500" : category.name === "Kultura" ? "bg-purple-700" : category.name === "Društvo" ? "bg-[#4e85c7]" : category.name === "Politika" ? "bg-red-500" :  "bg-white" }`}></div>
                                        <p className="text-sm max-[700px]:text-xs text-gray-400 " 
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
            </div> :
            <div className='h-full mt-0 mb-0 w-full bg-transparent rounded-0 flex flex-col items-center justify-center border-b-[1px] border-solid border-secondary'>
                <div className='container h-full flex flex-col justify-center'>
                    <h1 className={`mb-1 ml-0 line-clamp-2
                            text-sm
                            md:text-2xl
                            lg:text-3xl
                    `}>{post.title}</h1>
                    <div className='flex w-full items-center mb-0'>
                            <div className="flex items-center mt-0.0 flex-1">
                                {
                                    category ? 
                                    <div className="flex mb-0 items-center mt-0">
                                        <div className={`h-4 mr-1 w-[1px] ${ category.name === "Novosti" ? "bg-yellow-500" : category.name === "Sport" ? "bg-green-500" : category.name === "Kultura" ? "bg-purple-700" : category.name === "Društvo" ? "bg-[#295b96]" : category.name === "Politika" ? "bg-red-500" :  "bg-white" }`}></div>
                                        <p className="text-sm max-[700px]:text-xs" 
                                        >{category.name}</p>
                                    </div>
                                    : loadingSub ?
                                    <Skeleton className="h-4 w-12" /> : <></>
                                }
                            </div>
                            <p className='md:text-xs hidden text-gray-400 text-xs'><TrendingNewsDate date={post.createdAt} /></p>
                        </div>
                </div>

            </div>
        }
        </div>
        <div className='h-full w-ful hidden md:block'>
            <div className='relative w-full h-full'>
            <Image 
                alt='thumbnail'
                src={post.image}
                fill
                style={{objectFit:"cover", objectPosition: "top"}}
            />
            <div className="absolute h-full w-full opacity-100 flex flex-col">
                <div className={`${big ? 'h-full' : 'h-[50%]'}`}
                 style={{ backgroundImage: big ? 'linear-gradient(180deg, transparent, black)' : '' }}
                ></div>
                <div className={`${!big && 'bg-black opacity-90 h-[50%]'}`}></div>
            </div>
            <div className='absolute h-full w-full bg-transparent'>
                <div className={`h-full w-full pl-3 md:pl-5 md:pr-5 flex flex-col justify-end ${big ? 'md:pr-20' : 'md:pr-5'}`}>
                    <h1 className={`ml-0
                        text-sm
                        ${big ? `md:text-4xl` : `md:text-lg`}
                        ${big ? `leading-tight` : `md:leading-normal`}
                        ${!big && 'mb-0'}
                        ${big && 'font-bold'}
                        ${big ? 'line-clamp-3' : "line-clamp-2"}
                        text-white
                    `}>{post.title}</h1>
                    { big && <p className='text-xs lg:text-sm mb-2 text-gray-400 dark:text-gray-400 line-clamp-2'>{post.subtitle}</p> }
                    <div className={`flex items-center mt-0.5`}>
                        {
                            category ? 
                            <div className="flex mb-0 items-center mt-0">
                                <div className={`h-4 mr-1 w-[1px] ${ category.name === "Novosti" ? "bg-yellow-500" : category.name === "Sport" ? "bg-green-500" : category.name === "Kultura" ? "bg-purple-700" : category.name === "Društvo" ? "bg-[#4e85c7]" : category.name === "Politika" ? "bg-red-500" :  "bg-white" }`}></div>
                                <p className="text-sm max-[700px]:text-xs text-gray-400 " 
                                >{category.name}</p>
                            </div>
                            : loadingSub ?
                            <Skeleton className="h-4 w-12" /> : <></>
                        }
                    </div>
                    <p className={`md:text-xs text-gray-400 text-xs ${big ? 'mb-7' : 'mb-2'}`}><TrendingNewsDate date={post.createdAt} /></p>
                </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default TrendingNewsThumbnail