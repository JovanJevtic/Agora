'use client'
import Link from "next/link"
import { Post } from "@prisma/client"
import TrendingNewsThumbnail from "../TrendingNewsThumbnail/TrendingNewsThumbnail"

type Props = {
    posts: Post[]
}
const TrendingGrid: React.FunctionComponent<Props> = ({ posts }) => {
  return (
    <div className='flex w-full md:container mt-0 mb-10 h-[600px] md:h-[350px] bg-card md:bg-transparent md:mt-5'>
        <div className='grid h-full w-full grid-cols-2 grid-rows-[16] md:grid-cols-4 md:grid-rows-2 md:gap-3'>
           
            <Link href={`/post/${posts[0].id}`} className='col-start-1 row-start-1 row-end-[13] col-span-2 md:row-span-10 md:col-span-2 md:row-span-2'>
                <TrendingNewsThumbnail big post={posts[0]} />
            </Link>
            <Link href={`/post/${posts[1].id}`} className='col-span-2 row-span-1  md:col-span-1'>
                <TrendingNewsThumbnail big={false} post={posts[1]} />
            </Link> 
            <Link href={`/post/${posts[2].id}`} className='col-span-2 row-span-1  md:col-span-1'>
                <TrendingNewsThumbnail big={false} post={posts[2]} />
            </Link>
            <Link href={`/post/${posts[3].id}`} className='col-span-2 row-span-1  md:col-span-1'>
                <TrendingNewsThumbnail big={false} post={posts[3]} />
            </Link>
            <Link href={`/post/${posts[4].id}`} className='col-span-2 row-span-1  md:col-span-1'>
                <TrendingNewsThumbnail big={false} post={posts[4]} />
            </Link>
        </div>  
    </div>
  )
}

export default TrendingGrid