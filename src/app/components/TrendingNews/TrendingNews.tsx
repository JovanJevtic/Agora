import { Post } from '@prisma/client'
import React from 'react'
import Moment from 'react-moment'
import TrendingNewsDate from './TrendingNewsDate'
import TrendingNewsThumbnail from '../TrendingNewsThumbnail/TrendingNewsThumbnail'

type Props = {
    posts: Post[]
}

const TrendingNews: React.FunctionComponent<Props> = ({ posts }) => {
  return (
    <div className='flex w-full bg-background mt-3 mb-10'>
        <div className='grid h-full w-full max-[600px]:grid-cols-2 grid-rows-6 min-[600px]:grid-cols-3 min-[600px]:grid-rows-3 min-[1200px]:grid-cols-4 min-[1200px]:grid-rows-2 gap-2'>
            <div className='col-start-1 col-span-2 row-span-2 h-64'>
                <TrendingNewsThumbnail big post={posts[0]} />
            </div>
            <div className='col-span-1 row-span-2 h-64'>
                <TrendingNewsThumbnail big={false} post={posts[1]} />
            </div>
            <div className='col-span-1 row-span-2 h-64'>
                <TrendingNewsThumbnail big={false} post={posts[2]} />
            </div>
            <div className='col-span-1 row-span-2 h-64'>
                <TrendingNewsThumbnail big={false} post={posts[3]} />
            </div>
            <div className='col-span-1 row-span-2 h-64'>
                <TrendingNewsThumbnail big={false} post={posts[4]} />
            </div>
        </div>  
    </div>
  )
}

export default TrendingNews