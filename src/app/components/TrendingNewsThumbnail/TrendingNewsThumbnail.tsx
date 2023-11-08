import { Post } from '@prisma/client'
import React from 'react'
import TrendingNewsDate from '../TrendingNews/TrendingNewsDate';
import { Skeleton } from '../ui/skeleton';

type Props = {
    post: Post;
    big: boolean;
}
const TrendingNewsThumbnail: React.FunctionComponent<Props> = ({ post, big }) => {

    if (!post || !post.image) {
        return (
            <Skeleton className='h-full w-full' />
        )
    }

  return (
    <div className='h-full w-full min-h-[180px]'>
        <div className={`relative h-full trending-news-th-image`} style={{ backgroundImage: `url(${post.image})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <div className='h-full w-full flex justify-end flex-col'>
                <h1 style={{maxWidth: '90%', fontSize: '90%'}} className={`font-bold relative ml-3 capitalize`}>{post.title}</h1>
                {/* <p className='relative text-lg text-gray-400 ml-3'>{post.subtitle}</p> */}
                
                <p className='text-xs ml-3 mb-1 text-gray-400'><TrendingNewsDate date={post.createdAt} /></p>
               
            </div>
        </div>
    </div>
  )
}

export default TrendingNewsThumbnail