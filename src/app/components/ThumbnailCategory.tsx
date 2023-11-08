'use client'
import ThumbnailCategoryCard from "./ThumbnailCategoryCard"
import { useEffect, useState } from "react"
import { Card } from "./ui/card"
import Image from "next/image"
import TrendingNewsDate from "./TrendingNews/TrendingNewsDate"
import { Skeleton } from "./ui/skeleton"
import Link from "next/link"
import { Post, Subcategory } from "../../../prisma/generated/client"

type Props = {
    post: Post
}

const ThumbnailCategory: React.FunctionComponent<Props> = ({ post }) => {
    const [subcategory, setSubcategory] = useState<Subcategory | null>(null);
    const [loadingSub, setLoadingSub] = useState(false);

    const getSubcategory = async () => {
        try {
            setLoadingSub(true)
            const res = await fetch(`https://www.agoraporta.net/api/posts/subcategory/getById?id=${post.subcategoryId}`, {
                method: 'GET',
                cache: 'no-cache'
            })
            const data = await res.json();
            setLoadingSub(false)
            if (!data.subcategory) {
                setSubcategory(null)
            } else {
                setSubcategory(data.subcategory)
            }
        } catch (error) {
            setSubcategory(null)
            setLoadingSub(false)
        }
    }

    useEffect(() => {
        getSubcategory()
    }, [])

    return (
    <Link className="min-[840px]:w-[31%] h-full max-[840px]:w-full max-[840px]:mb-5" href={`/post/${post.id}`}>
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
        <Card className="flex flex-col h-full w-full border-none bg-black max-[840px]:h-96">
            <div className="flex-[4] w-full bg-primary">
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
                <p className="text-gray-400 text-sm mt-1">{post.subtitle}</p>
                <div className="flex mt-1">
                    <div className="flex-1 flex items-center">
                        {
                            subcategory  ? 
                            <div className="flex mt-1 items-center">
                                <div className={`h-6 w-[1px] bg-[#${subcategory.colorHex.length > 0 ? subcategory.colorHex : 'ffffff'}]`}></div>
                                <p className="ml-2 text-sm text-gray-400">{subcategory.name}</p>
                            </div>
                            : loadingSub ?
                            <Skeleton className="h-4 w-12" /> : <></>
                        }
                    </div>
                    <div className="flex-1 flex items-center justify-end">
                        <p className="text-sm text-gray-400 mt-1">
                            <TrendingNewsDate date={post.createdAt} />
                        </p>
                    </div>
                </div>
            </div>  
        </Card>
    </Link>
  ) 
}

export default ThumbnailCategory