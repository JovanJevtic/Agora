import { Category, Subcategory, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link"
import TrendingNewsDate from "../TrendingNews/TrendingNewsDate";
import Markdown from '../Markdown/Markdown'
import { useEffect, useState } from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote/rsc";
import PostSource from "../PostSource";

type Props = {
    category: Category;
    subcategorys: Subcategory[]
    subcategory: Subcategory;
    categoryHex: string;
    title: string;
    subtitle: string;
    author: User;
    content: string;
    createdAt: Date;
    image: string;
    fotoIzvor: string;
    izvor: string | null;
}
const PostCreationPreview: React.FunctionComponent<Props> = ({ izvor, fotoIzvor, category, content, createdAt, image, subcategorys, subcategory, categoryHex, author, subtitle, title }) => {

    // const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult>()

    const getMdx = async () => {
        // const mdxSource = await serialize(content, { mdxOptions: { development: false } })
        // setMdxSource(mdxSource)
    }

    useEffect(() => {
        getMdx()
    }, [])

  return (
    <div>
        <div className={`h-28 mb-10`}>
            <div className="dark:bg-secondary bg-white flex flex-col h-full">
                <div style={{ background: `${category.hexCol}` }} className="flex-[4] flex items-center justify-start border-[#333] border-b-[0px] border-solid">
                    <div className="container">
                        <h1 className="uppercase text-3xl font-bold text-white">{category.name}</h1>
                    </div>    
                </div>
                <div className="flex-[2] container">
                    <ul className="flex w-full h-full items-center">
                        {
                        subcategorys?.map(subcategoryCard => (
                            <Link 
                                key={subcategoryCard.id} 
                                style={{
                                    background: subcategoryCard.name === subcategory?.name ? `${category.hexCol}`: '', 
                                }} 
                                className={
                                    `h-full transition mr-0 hover:bg-[${categoryHex}] hover:dark:bg-[${categoryHex}]
                                    ${subcategoryCard.name === subcategory?.name ? `border-none font-bold text-white` : 'bg-slate-50 dark:bg-black'}
                                `} 
                                href={``}
                            >
                                <li className={`h-full flex items-center pl-5 pr-5`}>
                                    <p className="text-sm">{subcategoryCard.name}</p>
                                </li>
                            </Link>
                                    
                        ))
                        }
                    </ul>
                </div>
            </div>
        </div>
        <article className="w-full">
                <h1 className="text-4xl md:text-5xl dark:text-white text-black font-bold md:leading-tight lg:pr-3">
                    {title}
                </h1>
                <p className="text-xs md:text-sm text-gray-500 mt-3  md:w-[80%]">
                    {subtitle}
                </p>

                <div className="flex w-full mt-8 md:mt-10 flex-col mb-3">
                    <div className="flex items-center mr-10 ">
                    <PostSource author={author} izvor={izvor} />
                    </div>

                    <div className="flex-1 flex items-start mt-1 flex-col">
                    <p className="text-gray-950 dark:text-gray-50 text-xs md:text-sm font-bold capitalize">
                        <TrendingNewsDate full date={createdAt} />
                    </p>
                    </div>
                </div>

                <div className="relative h-auto w-[100%]">
                    <Image
                        alt="thumbnail"
                        src={image}
                        layout="responsive"
                        // objectFit='contain'
                        width={100}
                        height={100}
                    />
                </div>

                <div className="mt-1">
                    <p className="text-gray-400 text-xs md:text-sm">FOTO: {fotoIzvor}</p>
                </div>

                <div className="mt-5 prose w-full max-w-full 
                prose-headings:text-black prose-p:text-black prose-strong:text-black prose-blockquote:text-gray-500
                prose-headings:dark:text-white prose-p:dark:text-white prose-strong:dark:text-white prose-blockquote:dark:text-gray-500
                ">
                    {
                        // mdxSource && <Markdown source={mdxSource} />
                        <MDXRemote source={content} options={{ mdxOptions: { development: process.env.NODE_ENV === "development" } }} />
                    }
                </div>
            </article>
    </div>
  )
}

export default PostCreationPreview