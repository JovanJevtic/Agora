import Image from "next/image";
import TrendingNewsDate from "../TrendingNews/TrendingNewsDate";
import { Category, Post, User } from "@prisma/client";
import { User2 } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import Markdown from "../Markdown/Markdown";
import { MDXRemoteSerializeResult } from "next-mdx-remote/rsc";
import { GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/libs/authOptions";
import Btns from "./Btns";
import PostPageTrendingCard from "../PostPageTrendingCard";
import PostComments from "../PostComments";
import { PostWithComments, PostWithEverything } from "@/types";
import PostSource from "../PostSource";

type Props = {
  post: PostWithEverything;
  categoryName: string;
  subcategoryName: string;
  categoryHex: string;
};

const getAuthor = async (authorId: string): Promise<User> => {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/users/author/getById?id=${authorId}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getTrendingFromCategory = async (
  categoryId: string,
  postId: string
): Promise<Post[]> => {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/posts/trending/cards?type=category&categoryId=${categoryId}&postId=${postId}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getTrendingFromSubCategory = async (
  subcategoryId: string,
  postId: string
): Promise<Post[]> => {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/posts/trending/cards?type=subcategory&subcategoryId=${subcategoryId}&postId=${postId}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getTrendingFromAll = async (postId: string): Promise<Post[]> => {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/posts/trending/cards?type=all&postId=${postId}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// export const getStaticProps: GetStaticProps<{
// mdxSource: MDXRemoteSerializeResult
// }> = async () => {
// const mdxSource = await serialize()
// return { props: { mdxSource } }
// }

const Post: React.FunctionComponent<Props> = async ({
  post,
  categoryName,
  subcategoryName,
  categoryHex,
}) => {
  const authorData: Promise<User> = getAuthor(post.authorId);
  const author = await authorData;

  const trendingFromCategoryData: Promise<Post[]> = getTrendingFromCategory(
    post.categoryId,
    post.id
  );
  const trendingFromSubcategoryData: Promise<Post[]> =
    getTrendingFromSubCategory(post.subcategoryId as string, post.id);
  const trendingFromAllData: Promise<Post[]> = getTrendingFromAll(post.id);

  const mdxSource = await serialize(post.body, {
    mdxOptions: { development: process.env.NODE_ENV === "development" },
  });
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-[9]">
        <article className="w-full">
          <h1 className="text-4xl md:text-5xl dark:text-white text-black font-bold md:leading-tight lg:pr-3">
            {post.title}
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-3  md:w-[80%]">
            {post.subtitle}
          </p>

          <div className="flex w-full mt-8 md:mt-10 flex-col mb-3">

            <div className="flex items-center mr-10 ">
              <PostSource author={author} izvor={post.izvor} />
            </div>

            {session?.user.role === "admin" && (
              <div className="mb-3">
                <p className="text-xs md:text-sm mr-1 text-gray-500 dark:text-gray-500">
                  {author.email}
                </p>
              </div>
            )}

            <div className="flex-1 flex items-start mt-1 flex-col">
              <p className="text-gray-950 dark:text-gray-50 text-xs md:text-sm font-bold capitalize">
                <TrendingNewsDate full date={post.createdAt} />
              </p>
              {post.createdAt !== post.updatedAt && (
                // <p className="text-gray-400 text-xs md:text-sm">
                //   Izmjenjeno: <TrendingNewsDate full date={post.updatedAt} />
                // </p>
                <></>
              )}
            </div>
          </div>

          {session?.user.role === "admin" && (
            <Btns slug={post.slug} archived={post.archived} postId={post.id} />
          )}

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

          <div className="mt-1">
            <p className="text-gray-400 text-xs md:text-sm">
              FOTO: {post.fotoIzvor}
            </p>
          </div>

          <div
            className="mt-5 prose w-full max-w-full 
           prose-headings:text-black prose-p:text-black prose-strong:text-black prose-blockquote:text-gray-500
           prose-headings:dark:text-white prose-p:dark:text-white prose-strong:dark:text-white prose-blockquote:dark:text-gray-500
           "
          >
            <Markdown source={mdxSource} />
          </div>
        </article>
      </div>

      <div className="lg:flex-[5]">
        <div className="h-full w-full pt-10 lg:pl-5 lg:pt-0">
          <div className="h-full w-full">
            <PostPageTrendingCard
              categoryHex={categoryHex}
              requestPromise={trendingFromCategoryData}
              title={categoryName}
            />
            {post.subcategoryId && (
              <div className="mt-10">
                <PostPageTrendingCard
                  subcategory={false}
                  text="Povezano"
                  categoryHex={categoryHex}
                  requestPromise={trendingFromSubcategoryData}
                />
              </div>
            )}
            <div className="mt-10">
              <PostPageTrendingCard
                subcategory={false}
                text="Najnovije"
                requestPromise={trendingFromAllData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
