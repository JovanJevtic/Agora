import Image from "next/image";
import { Post } from "../../../../prisma/generated/client";

type Props = {
    post: Post;
}

const Post: React.FunctionComponent<Props> = async ({ post }) => {
    return (
    <div>
        <h1 className='mb-3 text-2xl text-white font-bold'>{post.title}</h1>
            <div className='relative min-h-[50vh] w-[50%] bg-red-500'>
                <Image
                    alt='thumbnail'
                    src={post.image}
                    layout='fill'
                    objectFit='cover'
                />
            </div>
    </div>
  )
}

export default Post