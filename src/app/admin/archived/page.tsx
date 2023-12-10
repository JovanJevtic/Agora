import { Post } from "@prisma/client"
import ArchivedPostCard from "./ArchivedPostCard";

const getAllArchivedPosts = async (): Promise<Post[]> => {
    try {
        const res = await fetch(`https://www.agoraportal.net/api/posts/all/archived`, {
            method: 'GET',
            cache: 'no-store',
        });
        const resData = await res.json();
        return resData;
    } catch (error: any) {
        throw new Error(error);
    }
}

const ArchivedPage = async () => {
    const postsData = getAllArchivedPosts();
    const posts = await postsData;


    return (
    <div className="container">
        {
            posts.length < 1 && <div className="container w-full flex justify-center mt-3">
                <h1 className="text-gray-500 text-xl font-bold">Još nijedan članak nije arhiviran</h1>
            </div>
        }
        {
            posts?.map((post) => (
                <ArchivedPostCard post={post} key={post.id} />
            ))
        }
    </div>
  )
}

export default ArchivedPage