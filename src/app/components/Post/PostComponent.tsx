import Image from "next/image";
import TrendingNewsDate from "../TrendingNews/TrendingNewsDate";
import { Post, User } from "@prisma/client";
import { User2 } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";

type Props = {
  post: Post;
};

const getAuthor = async (authorId: string) => {
  try {
    const res = await fetch(
      `https://www.agoraportal.net/api/users/author/getById?id=${authorId}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return null;
  }
};

const Post: React.FunctionComponent<Props> = async ({ post }) => {
  const authorData: Promise<User> = getAuthor(post.authorId);
  const author = await authorData;

  return (
    <div className="flex">
      <div className="flex-[7]">
        <article className="w-full prose-neutral prose-h1:text-4xl prose-p:mt-0 prose-p:mb-0 prose-p:pt-0 prose-p:pb-0 lg:prose-xl prose-h1:leading-tight prose-h1:mb-0 prose-h1:pb-0">
          <h1 className="text-2xl md:text-3xl dark:text-white text-black font-bold">
            {post.title}
          </h1>

          <div className="flex w-full mt-7 flex-col mb-5 min-[1024px]:mb-0">
            <div className="flex items-center mr-10 ">
              <p className="text-gray-500 text-sm mr-2">Autor:</p>
              <p className="text-sm mr-1">{author.name}</p>
              {author.image ? (
                <Image
                  className="mr-0"
                  style={{ borderRadius: "50%" }}
                  src={author.image}
                  height={30}
                  width={30}
                  alt="profile"
                />
              ) : (
                // <FaUserCircle className='mr-0 w-[30px]' />
                <></>
              )}
            </div>

            <div className="flex-1 flex items-center">
              <p className="text-gray-500 text-sm">
                <TrendingNewsDate full date={post.createdAt} />
              </p>
              {post.createdAt === post.updatedAt && (
                <p className="text-gray-500 text-sm">
                  Izmjenjeno: <TrendingNewsDate date={post.updatedAt} />
                </p>
              )}
            </div>
          </div>

          <div className="relative h-auto w-[100%]">
            <Image
              alt="thumbnail"
              src={post.image}
              layout="responsive"
              // objectFit='contain'
              width={100}
              height={100}
            />
          </div>
          <div className="mt-3">
            <p className="mt-3 text-gray-400 text-sm">FOTO: {post.fotoIzvor}</p>
          </div>

          <div className="mt-5 prose prose-strong:text-black dark:prose-strong:text-white prose-p:text-lg prose-xl prose-headings:text-black dark:prose-headings:text-white prose-p:text-black dark:prose-p:text-white prose-blockquote:border-l-2 prose-blockquote:border-gray-500">
            <div
              className="w-full"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          </div>
        </article>
      </div>
      <div className="lg:flex-[4]"></div>
    </div>
  );
};

export default Post;
