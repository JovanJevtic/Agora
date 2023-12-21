'use client'

import { Post } from "@prisma/client";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import ThumbnailCategory from "../ThumbnailCategory";
import { Card } from "../ui/card";
import Link from "next/link";
import { ArrowBigRight, ArrowRight, ArrowRightFromLineIcon, ArrowRightSquare, ArrowRightToLine } from "lucide-react";

type Props = {
    category: "Novosti" | "Sport" | "Politika" | "Društvo" | "Kultura";
}
const TrendingFromCategory: React.FunctionComponent<Props> = ({ category }) => {
    const getLatest = async () => {
        try {
            const res = await fetch(`https://www.agoraportal.net/api/posts/category/latest?name=${category}`, {
                method: 'GET',
                cache: 'no-cache'
            })
            const data = await res.json();

            if (data.posts) {
                setData(data.posts);
            } else {
                setErr("Doslo je do greske! ")

            }
        } catch (error: any) {
            setErr(error)
        }
    }

    const [data, setData] = useState<Post[]>();
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        getLatest();
    }, [])

    if (!data || data.length < 1) {
        return(
            <div className="container">  
                <div className="flex items-center mb-5">
                    <div className={`absolute h-6 ${ category === "Novosti" ? "bg-yellow-500" : category === "Sport" ? "bg-green-500" : category === "Kultura" ? "bg-purple-700" : category === "Društvo" ? "bg-[#4e85c7]" : category === "Politika" ? "bg-orange-500" :  "bg-white" }`} style={{width: '2px'}}></div>
                    <h1 className="font-bold text-lg ml-3">{category}</h1>
                    <div className="flex-1 flex justify-end h-full items-center">
                        <Skeleton className="w-20 h-6" />
                    </div>
                </div>
                <div className="flex min-[840px]:h-96 w-full justify-between items-center mb-10 max-[840px]:flex-col">
                    <Skeleton className="min-[840px]:w-[31%] min-[840px]:h-full"></Skeleton>
                    <Skeleton className="min-[840px]:w-[31%] min-[840px]:h-full"></Skeleton>
                    <Skeleton className="min-[840px]:w-[31%] min-[840px]:h-full max-[840px]:h-96  max-[840px]:w-full"></Skeleton>
                </div>
            </div>
        )
    }

  return (
    <div className="container">
        <Link className="mt-5" href={`/category/${category}`}>
        {/* <Card className="p-5 mb-10 border-background"> */}
            <div className="flex mb-5 items-center">
                <div className={`absolute h-6 ${ category === "Novosti" ? "bg-yellow-500" : category === "Sport" ? "bg-green-500" : category === "Kultura" ? "bg-purple-700" : category === "Društvo" ? "bg-[#4e85c7]" : category === "Politika" ? "bg-red-500" :  "bg-white" }`} style={{width: '2px'}}></div>
                <h1 className="font-bold text-lg ml-3">{category}</h1>
                <div className="flex-1 flex justify-end h-full items-center">
                    <p className="text-xs text-gray-500">Pogledaj još</p>
                    <ArrowRight className="text-gray-500 ml-1" size={16} />
                </div>
            </div>
            <div className="min-[1200px]:flex w-full min-[1200px]:justify-between min-[1200px]:h-[460px] max-[760px]:grid-cols-1 max-[1200px]:grid max-[1200px]:grid-cols-2 max-[1200px]:grid-rows-1 gap-x-5">
            {/* max-[840px]:flex-col max-[1200px]:grid max-[1200px]:grid-cols-2 max-[1200px]:grid-rows-2 gap-x-5 */}
                {data?.map(post => (
                    <ThumbnailCategory post={post} key={post.id} />
                ))}
            </div>
        {/* </Card> */}
    </Link>
    </div>
  )
}

export default TrendingFromCategory