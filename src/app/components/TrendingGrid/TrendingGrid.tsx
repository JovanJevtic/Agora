'use client'
import Link from "next/link"
import { Post } from "../../../../prisma/generated/client"
import TrendingNewsThumbnail from "../TrendingNewsThumbnail/TrendingNewsThumbnail"

type Props = {
    posts: Post[]
}
const TrendingGrid: React.FunctionComponent<Props> = ({ posts }) => {
  return (
    <div className='flex w-full bg-background mt-3 mb-10'>
        <div className='grid h-full w-full grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-2 gap-1'>
            <Link href={`/post/${posts[0].id}`} className='col-start-1 col-span-2 row-span-1 md:col-span-2 md:row-span-1'>
                <TrendingNewsThumbnail big post={posts[0]} />
            </Link>
            <Link href={`/post/${posts[1].id}`} className='col-span:1 row-span-1'>
                <TrendingNewsThumbnail big={false} post={posts[1]} />
            </Link>
            <Link href={`/post/${posts[2].id}`} className='col-span:1 row-span-1'>
                <TrendingNewsThumbnail big={false} post={posts[2]} />
            </Link>
            <Link href={`/post/${posts[3].id}`} className='col-span:1 row-span-1'>
                <TrendingNewsThumbnail big={false} post={posts[3]} />
            </Link>
            <Link href={`/post/${posts[4].id}`} className='col-span:1 row-span-1'>
                <TrendingNewsThumbnail big={false} post={posts[4]} />
            </Link>
        </div>  
    </div>
  )
}

export default TrendingGrid