import ThumbnailCategory from '@/app/components/ThumbnailCategory'
import { Post } from '@prisma/client'
import { redirect } from 'next/navigation'

const getPosts = async (name: string) => {
    const res = await fetch(`https://www.agoraportal.net/api/posts/category?name=${name}`, {
        method: 'GET',
        cache: 'no-cache'
    })
    const data: Post[] = await res.json()
    return data;
}   



export default async function Page({ params }: { params: { slug: string } }) {
    const category = params.slug;
    if (category !== "Novosti" && category !== "Sport" && category !== "Drustvo" && category !== "Kultura" && category !== "Politika") {
        redirect('/');
    }
    const posts = await getPosts(params.slug);
    return <div className='w-full h-full'>
        <div className='flex h-14 items-center'>
            <div className={`absolute h-6 ${ category === "Novosti" ? "bg-primary" : category === "Sport" ? "bg-green-500" : category === "Kultura" ? "bg-purple-700" : category === "Drustvo" ? "bg-blue-500" : category === "Politika" ? "bg-red-500" :  "bg-white" }`} style={{width: '2px'}}></div>
            <h1 className='ml-2 font-bold text-lg'>{category}</h1>
        </div>
        
        {posts.map((post) => (
            <div className='mb-10' key={post.id}>
                <ThumbnailCategory post={post} key={post.id} />
            </div>
        ))}
    </div>
}