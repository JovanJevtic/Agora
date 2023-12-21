import ThumbnailCategory from '@/app/components/ThumbnailCategory'
import { Post } from '@prisma/client'
import { redirect } from 'next/navigation'

const getPosts = async (name: string) => {
    try {
        const res = await fetch(`https://www.agoraportal.net/api/posts/category?name=${name}`, {
            method: 'GET',
            cache: 'no-cache'
        })
        const data: Post[] = await res.json()
        return data;
    } catch (error: any) {
        throw new Error(error)   
    }
}   



export default async function Page({ params }: { params: { slug: string } }) {
    const category = decodeURIComponent(params.slug);

    if (category !== "Novosti" && category !== "Sport" && category !== "Društvo" && category !== "Kultura" && category !== "Politika") {
        redirect('/');
    }
    const posts = await getPosts(params.slug);
    return(
        <div className='container min-h-[70vh]'>
            <div className='flex h-20 items-center'>
                <div className={`absolute h-6 ${ category === "Novosti" ? "bg-yellow-500" : category === "Sport" ? "bg-green-500" : category === "Kultura" ? "bg-purple-700" : category === "Društvo" ? "bg-blue-500" : category === "Politika" ? "bg-red-700" :  "bg-white" }`} style={{width: '2px'}}></div>
                    <h1 className='ml-3 font-bold text-lg'>{category}</h1>
                </div>
            <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        
        
            {posts.map((post) => (
                <div className='mb-10 max-w-[500px]' key={post.id}>
                    <ThumbnailCategory post={post} />
                </div>
            ))}
        </div>
    </div>
    )
}