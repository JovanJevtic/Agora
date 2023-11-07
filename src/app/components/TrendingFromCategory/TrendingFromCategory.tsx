'use client'

import { Post } from "@prisma/client";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import ThumbnailCategory from "../ThumbnailCategory";
import { Card } from "../ui/card";
import Link from "next/link";
import { ArrowBigRight, ArrowRight, ArrowRightFromLineIcon, ArrowRightSquare, ArrowRightToLine } from "lucide-react";

type Props = {
    category: "Novosti" | "Sport" | "Politika" | "Drustvo" | "Kultura";
}
const TrendingFromCategory: React.FunctionComponent<Props> = ({ category }) => {
    const getLatest = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/posts/category/latest?name=${category}`, {
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

    if (!data && !err) {
        return(
            <div className="flex h-40 w-full justify-between items-center mb-10">
                <Skeleton className="w-40 h-full" />
                <Skeleton className="w-40 h-full" />
                <Skeleton className="w-40 h-full" />
            </div>
        )
    }

  return (
    <Link className="mt-10" href={`/${category}`}>
        {/* <Card className="p-5 mb-10 border-background"> */}
            <div className="flex">
                <div className={`absolute h-6 ${category === "Novosti" ? "bg-primary" : category === "Sport" ? "bg-green-700": "bg-red-800"}`} style={{width: '2px'}}></div>
                <h1 className="font-bold text-lg mb-5 ml-3">{category}</h1>
                <div className="flex-1 flex justify-end h-full items-center">
                    <p className="text-sm text-gray-500">Pogledaj jos</p>
                    <ArrowRight className="text-gray-500 ml-1" size={16} />
                </div>
            </div>
            <div className="flex w-full justify-between h-96">
                {data?.map(post => (
                    <ThumbnailCategory post={post} key={post.id} />
                ))}
            </div>
        {/* </Card> */}
    </Link>
  )
}

export default TrendingFromCategory