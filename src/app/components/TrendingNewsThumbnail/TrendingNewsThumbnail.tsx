import { Post } from '@prisma/client'
import React from 'react'
import TrendingNewsDate from '../TrendingNews/TrendingNewsDate';

type Props = {
    post: Post;
    big: boolean;
}
const TrendingNewsThumbnail: React.FunctionComponent<Props> = ({ post, big }) => {
  return (
    <div className='h-full w-full'>
        <div className={`relative h-full trending-news-th-image`} style={{ backgroundImage: `url(${post.image})`, backgroundPosition: 'center' }}>
            <div className='h-full w-full flex justify-end flex-col'>
                <h1 className={`font-bold relative ${big ? 'text-5xl' : 'text-2xl'} ml-3 capitalize`}>{post.title}</h1>
                <p className='relative text-lg text-gray-400 ml-3'>{post.subtitle}</p>
               <div className={`ml-3 text-white ${big ? 'mb-5' : "mb-2"}`}>
                <TrendingNewsDate date={post.createdAt} />
               </div>
            </div>
        </div>
    </div>
  )
}

export default TrendingNewsThumbnail