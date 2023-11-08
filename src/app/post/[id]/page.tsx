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
        console.log(error);
        redirect('/')
    }
}   

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const post: Post = await getPost(id);
    return <div className='w-full h-full'>
        
        <article className="prose lg:prose-xl">
            { post.body }
        </article>
       
    </div>
}