import { Post } from "@prisma/client"
import Image from "next/image"
import TrendingNewsDate from "./TrendingNews/TrendingNewsDate"
import Link from "next/link"
import { Card } from "./ui/card"

type Props = {
    post: Post
}
const ThumbnailCategory: React.FunctionComponent<Props> = ({ post }) => {
  return (
    <Link style={{width: '31%', height: '100%'}} href={`/post/${post.id}`}>
        {/* <div className="rounded-md background-image-blured" 
            style={{ backgroundImage: `url(${post.image})`, backgroundRepeat: 'none', backgroundSize: 'cover', backgroundPosition: 'center', height: '100%' }}    
        >
        <div className="flex flex-col justify-end" style={{ width: '100%', height: '100%' }}>
            <h1 className="ml-5 text-white text-bold mb-5 text-xl">
                {post.title}
            </h1>
            <p className="ml-5 text-white text-bold">{post.subtitle}</p>
            <div className="ml-5 text-white font-bold">
                <TrendingNewsDate date={post.createdAt} />
            </div>
        </div>
        </div> */}
        <Card className="flex flex-col h-full w-full border-none bg-black">
            <div className="flex-[5] w-full bg-primary">
                {/* <Image src={post.image} alt="a" width={'100'} height={100} /> */}
                <div style={{width: '100%', height: '100%', position: 'relative'}}>
                    <Image
                        src={post.image} alt="a"
                        layout='fill'
                        objectFit='cover'
                        objectPosition="top"
                    />
                </div>
            </div>
            <div className="flex-[3] w-full">
                <h1 className="font-bold mt-3 capitalize text-lg">{post.title}</h1>
                <p className="text-gray-400 text-sm">{post.subtitle}</p>
                <p className="text-sm text-gray-400 mt-1">
                    <TrendingNewsDate date={post.createdAt} />
                </p>
            </div>  
        </Card>
    </Link>
  ) 
}

export default ThumbnailCategory