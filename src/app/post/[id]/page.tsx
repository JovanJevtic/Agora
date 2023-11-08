import ThumbnailCategory from '@/app/components/ThumbnailCategory'
import { Post } from '@prisma/client'
import { redirect } from 'next/navigation'

const getPost = async (id: string) => {
    try {
        const res = await fetch(`https://www.agoraportal.net/api/posts/getOne?slug=${id}`, {
            method: 'GET',
            cache: 'no-cache'
        })
        const data = await res.json()
        return data;
       
    } catch (error) {
        redirect('/')
    }
}   

export async function generateStaticParams() {
    const res = await fetch('https://www.agoraportal.net/api/posts/all');
    const posts: Post[] = await res.json();
   
    return posts.map((post) => ({
      id: post.id,
    }))
}

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const post: Post = await getPost(id);
    return (
        <div className='w-full h-90vh'>
        <h1 className='text-red-500 text-lg'>{post.title}</h1>
        <p>{post.subtitle}</p>
        {/* <article className="prose lg:prose-xl">
            { post.body }
        </article> */}
       
    </div>
    )
}