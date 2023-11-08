import ThumbnailCategory from '@/app/components/ThumbnailCategory'
import { Post } from '@prisma/client'
import { redirect } from 'next/navigation'

const getPost = async (slug: string) => {
    try {
        const res = await fetch(`https://www.agoraportal.net/api/posts/getOne?slug=${slug}`, {
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

export default async function Page({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const post: Post = await getPost(slug);
    return <div className='w-full h-full'>
        
        <article className="prose lg:prose-xl">
            { post.body }
        </article>
       
    </div>
}