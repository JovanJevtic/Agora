'use client'
import { Post } from '@prisma/client'
import React from 'react'
import Moment from 'react-moment'
import TrendingNewsDate from './TrendingNewsDate'
import TrendingNewsThumbnail from '../TrendingNewsThumbnail/TrendingNewsThumbnail'
import Link from 'next/link'

type Props = {
    posts: Post[]
}

const TrendingNews: React.FunctionComponent<Props> = ({ posts }) => {
  return (
    <div className='flex w-full bg-background mt-3 mb-10'>
        <div className='grid h-full w-full max-[600px]:grid-cols-2 grid-rows-5 min-[600px]:grid-cols-3 min-[600px]:grid-rows-3 gap-2'>
           
            <Link href={`/post/${posts[0].id}`} className='col-start-1 max-[600px]:col-span-2 max-[600px]:row-span-1  max-[600px]:h-64 min-[600px]:row-span-2 min-[600px]:row-start-1 min-[600px]:row-end-3 min-[600px]:col-span-2 '>
                <TrendingNewsThumbnail big post={posts[0]} />
            </Link>
            <Link href={`/post/${posts[1].id}`} className='max-[600px]:col-span-2 max-[600px]:row-span-1 max-[600px]:h-64'>
                <TrendingNewsThumbnail big={false} post={posts[1]} />
            </Link>
            <Link href={`/post/${posts[2].id}`} className='max-[600px]:col-span-2 max-[600px]:row-span-1  max-[600px]:h-64'>
                <TrendingNewsThumbnail big={false} post={posts[2]} />
            </Link>
            <Link href={`/post/${posts[3].id}`} className='max-[600px]:col-span-2 max-[600px]:row-span-1  min-[600px]:col-span-2 max-[600px]:h-64'>
                <TrendingNewsThumbnail big={false} post={posts[3]} />
            </Link>
            <Link href={`/post/${posts[4].id}`} className='max-[600px]:col-span-2 max-[600px]:row-span-1 max-[600px]:h-64'>
                <TrendingNewsThumbnail big={false} post={posts[4]} />
            </Link>
        </div>  
    </div>
  )
}

export default TrendingNews