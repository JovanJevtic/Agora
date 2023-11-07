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
    <div className='flex w-full h-96 bg-background mt-3'>
        <div className='grid grid-cols-4 grid-rows-2 h-full w-full gap-2'>
            <div className='col-start-1 col-span-2 row-span-2 row-start-1'>
                <TrendingNewsThumbnail big post={posts[0]} />
            </div>
            <div className='col-span-1 row-span-1'>
                <TrendingNewsThumbnail big={false} post={posts[1]} />
            </div>
            <div className='col-span-1 row-span-1'>
                <TrendingNewsThumbnail big={false} post={posts[2]} />
            </div>
            <div className='col-span-1 row-span-1'>
                <TrendingNewsThumbnail big={false} post={posts[3]} />
            </div>
            <div className='col-span-1 row-span-1'>
                <TrendingNewsThumbnail big={false} post={posts[4]} />
            </div>
        </div>  
    </div>
  )
}

export default TrendingNews