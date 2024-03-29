'use client'
import Link from "next/link"
import { Post } from "@prisma/client"
import TrendingNewsThumbnail from "../TrendingNewsThumbnail/TrendingNewsThumbnail"

type Props = {
    primary: Post;
    secondary: Post[]
}
const TrendingGrid: React.FunctionComponent<Props> = ({ primary, secondary }) => {
  return (
    <div className='flex flex-col w-full md:container mt-0 mb-10 h-[700px] md:h-[500px] bg-card md:bg-transparent md:mt-0'>
        <div className="w-full h-full p-0 md:p-1 bg-card rounded-sm">
            <div className='grid h-full w-full grid-cols-2 grid-rows-[16] md:grid-cols-4 md:grid-rows-2 md:gap-1'>
            
            <Link href={`/post/${primary.slug}`} className='col-start-1 row-start-1 row-end-[13] col-span-2 md:row-span-10 md:col-span-2 md:row-span-2'>
                <TrendingNewsThumbnail big post={primary} />
            </Link>
            <Link href={`/post/${secondary[0].slug}`} className='col-span-2 row-span-1  md:col-span-1'>
                <TrendingNewsThumbnail big={false} post={secondary[0]} />
            </Link> 
            <Link href={`/post/${secondary[1].slug}`} className='col-span-2 row-span-1  md:col-span-1'>
                <TrendingNewsThumbnail big={false} post={secondary[1]} />
            </Link>
            <Link href={`/post/${secondary[2].slug}`} className='col-span-2 row-span-1  md:col-span-1'>
                <TrendingNewsThumbnail big={false} post={secondary[2]} />
            </Link>
            <Link href={`/post/${secondary[3].slug}`} className='col-span-2 row-span-1  md:col-span-1'>
                <TrendingNewsThumbnail big={false} post={secondary[3]} />
            </Link>
            
        </div>  
        </div>
    </div>
  )
}

export default TrendingGrid