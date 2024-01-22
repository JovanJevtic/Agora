"use client";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import TrendingNewsDate from "./TrendingNews/TrendingNewsDate";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { Post, Subcategory } from "@prisma/client";

type Props = {
  post: Post;
};

const ThumbnailCategory: React.FunctionComponent<Props> = ({ post }) => {
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null);
  const [loadingSub, setLoadingSub] = useState(false);

  const getSubcategoryData = async (
    subcategoryId: string
  ): Promise<Subcategory> => {
    try {
      const res = await fetch(
        `${process.env.BASE_URL}/api/posts/subcategory/getById?id=${subcategoryId}`,
        {
          method: "GET",
          cache: "no-cache",
        }
      );

      const data = await res.json();
      return data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };

  const getSubcategory = async () => {
    setLoadingSub(true);
    const res = await getSubcategoryData(post.subcategoryId as string);
    setLoadingSub(false);
    setSubcategory(res);
  };

  useEffect(() => {
    if (post.subcategoryId) {
      getSubcategory();
    }
  }, []);

  return (
    <Link
      className="min-[1200px]:w-[31%] max-[840px]:w-full mb-5 max-[1200px]:col-span-1 max-[1200px]:row-span-1"
      href={`/post/${post.slug}`}
    >
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
      <Card className="flex flex-col h-full w-full border-none">
        <div className="flex-[4] w-full">
          {/* <Image src={post.image} alt="a" width={'100'} height={100} /> */}
          <div className="w-full relative min-h-[160px] md:min-h-[240px] h-full">
            <Image
              src={post.image}
              alt="a"
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
            />
          </div>
        </div>
        <div className=" w-full p-3">
          <h1 className=" mt-1 capitalize text-lg hover:underline transition line-clamp-3">
            {post.title}
          </h1>
          <p className="text-gray-500 text-xs mt-1 line-clamp-2">
            {post.subtitle}
          </p>
          <div className="h-5"></div>
          <div className="flex mb-1">
            <div className="flex-1 flex items-center">
              {subcategory ? (
                <div className="flex mt-1 items-center">
                  {/* <div className={`h-6 w-[1px]`} style={{ background: `#${subcategory.colorHex}` }}></div> */}
                  <p
                    className="text-xs text-gray-400"
                    // style={{ color: `#${subcategory.colorHex}` }}
                  >
                    {subcategory.name}
                  </p>
                </div>
              ) : loadingSub ? (
                <Skeleton className="h-4 w-12" />
              ) : (
                <></>
              )}
            </div>
            <div className="flex-1 flex items-center justify-end">
              <p className="text-xs text-gray-400">
                <TrendingNewsDate date={post.createdAt} />
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ThumbnailCategory;
