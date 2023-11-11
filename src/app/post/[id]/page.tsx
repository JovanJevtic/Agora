import { Post } from '@prisma/client'
import { redirect } from 'next/navigation'
type Props = {
    params: {
        id: string
    }
}

const getPost = async (id: string) => {
    try {
        const res = await fetch(`https://www.agoraportal.net/api/posts/getOne?slug=${id}`, {
            method: 'GET',
            cache: 'no-cache'
        })
        const data = await res.json()
        return data;
    } catch (error: any) {
        redirect('/')
    }
}   

export async function generateStaticParams() {
    const ids = await fetch('https://www.agoraportal.net/api/posts/all/staticParams').then((res) => res.json())

    return ids.map((id: string) => ({
      id: id
    }))
}

const Page: React.FunctionComponent<Props> = async ({ params: { id } }) => {
    const postData = getPost(id);
    const post: Post = await postData;

    return (
        <div className='h-[90vh] w-full'>
            <h1>{post.title}</h1>
        </div>
    )
}

export default Page