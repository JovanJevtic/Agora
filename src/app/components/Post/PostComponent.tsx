import Image from "next/image";
import { Post } from "../../../../prisma/generated/client";
import TrendingNewsDate from "../TrendingNews/TrendingNewsDate";
import { User } from "@prisma/client";
import { User2 } from "lucide-react";
import { FaUserCircle } from 'react-icons/fa'

type Props = {
    post: Post;
}

const getAuthor = async (authorId: string) => {
    try {
        const res = await fetch(`https://www.agoraportal.net/api/users/author/getById?id=${authorId}`, {
            method: 'GET',
            cache: 'no-cache'
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return null
    }
}

const Post: React.FunctionComponent<Props> = async ({ post }) => {
    const authorData: Promise<User> = getAuthor(post.authorId);
    const author = await authorData;

    return (
        <div className="flex">
            <div className="flex-[7]">
                <article className="w-full prose-neutral prose-p:mt-0 prose-p:mb-0 prose-p:pt-0 lg:prose-xl prose-h1:leading-tight prose-h1:mb-0 prose-h1:pb-0">
                    <h1 className='text-3xl text-white font-bold'>{post.title}</h1>
                   
                    <div className="flex w-full min-[600px]:items-center mt-5 max-[1024px]:mb-5 max-[600px]:flex-col">
                        <div className="flex items-center mr-10 max-[600px]:mb-1">
                            {
                                (author.image) ? <Image className='mr-2' style={{borderRadius: '50%'}} src={author.image} height={24} width={24} alt="profile" />
                                :<FaUserCircle className='mr-3' />
                            }
                            <p className='text-sm'>{author.name}</p>
                        </div>

                        <div className="flex-1 flex items-center">
                            <p className="text-gray-500 text-sm">
                                <TrendingNewsDate full date={post.createdAt} />
                            </p>
                            {
                                (post.createdAt === post.updatedAt) && <p className="text-gray-500 text-sm">Izmjenjeno: <TrendingNewsDate date={post.updatedAt} /></p>
                            }
                        </div>
                    </div>
                
                    <div className='relative min-h-[400px] w-[100%] mb-20'>
                        <Image
                            alt='thumbnail'
                            src={post.image}
                            layout='fill'
                            objectFit='cover'
                        />
                    </div>
                        
                    <div className=" mt-10 prose prose-xl prose-headings:text-white prose-p:text-white prose-blockquote:border-l-2 prose-blockquote:border-gray-500">
                    
                        <div className="w-full" dangerouslySetInnerHTML={{__html: post.body}} />
                        
                    </div>
                </article>
            </div>
            <div className="lg:flex-[4]"></div>
        </div>
  )
}

export default Post