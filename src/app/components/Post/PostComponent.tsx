import Image from "next/image";
import { Post } from "../../../../prisma/generated/client";
import TrendingNewsDate from "../TrendingNews/TrendingNewsDate";
import { User } from "@prisma/client";
import { User2 } from "lucide-react";

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
        console.log(error);
    }
}

const Post: React.FunctionComponent<Props> = async ({ post }) => {
    const authorData: Promise<User> = getAuthor(post.authorId);
    const author = await authorData;

    return (
        <div className="flex">
            <div className="flex-[7]">
                <article className="prose-neutral lg:prose-xl prose-h1:leading-tight">
                    <h1 className='text-3xl text-white font-bold'>{post.title}</h1>
                    <p className="text-gray-500 text-sm">
                        <TrendingNewsDate date={post.createdAt} />
                    </p>
                    {
                        (post.createdAt === post.updatedAt) && <p className="text-gray-500 text-sm"><TrendingNewsDate date={post.updatedAt} /></p>
                    }
                    
                    <div className="flex items-center">
                        {
                            (author.image) ? <Image className='mr-2' style={{borderRadius: '50%'}} src={author.image} height={24} width={24} alt="profile" />
                            :<User2 className='mr-3' />
                        }
                        <p className='text-sm max-[600px]:hidden'>{author.name}</p>
                    </div>
                
                    <div className='relative min-h-[400px] w-[100%] mb-20'>
                        <Image
                            alt='thumbnail'
                            src={post.image}
                            layout='fill'
                            objectFit='cover'
                        />
                    </div>
                        
                    <div className="mt-10">
                        <p>
                        { post.body }
                        </p>
                    </div>
                </article>
            </div>
            <div className="lg:flex-[4]"></div>
        </div>
  )
}

export default Post