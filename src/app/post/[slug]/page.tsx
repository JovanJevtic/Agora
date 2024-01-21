import PostComponent from "@/app/components/Post/PostComponent";
import PostPageDetails, {
  PostPageDetailsLoading,
} from "@/app/components/PostPageDetails/PostPageDetails";
import { Category, Post, Subcategory } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { Metadata, ResolvingMetadata } from "next";
import PostComments from "@/app/components/PostComments";
import { PostWithComments, PostWithEverything } from "@/types";
import prisma from "@/app/libs/prismadb";

type Props = {
  params: {
    slug: string;
  };
};

export const dynamic = 'force-dynamic'

export const getPost = async (slug: string): Promise<PostWithEverything> => {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/posts/getOne?slug=${slug}`,
      // `http://localhost:3000/api/posts/getOne?slug=${slug}`,
      {
        method: "GET",
        cache: "no-cache",
        next: {
          tags: ['post']
        }
      }
    );
    const data = await res.json();
    if (data.status === 500) {
      notFound()
    }
    return data;
  } catch (error: any) {
    notFound()
    throw new Error(error);
  }
};

export const getCategory = async (categoryId: string): Promise<Category> => {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/posts/category/getById?id=${categoryId}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error)
  }
};

export const getSubcategory = async (subcategoryId: string): Promise<Subcategory> => {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/posts/subcategory/getById?id=${subcategoryId}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error)
  }
};

export async function generateStaticParams() {
  const slugs = await fetch(
    `${process.env.BASE_URL}/api/posts/all/staticParams`,
    {
      cache: 'no-cache',
      next: {
        tags: ['post']
      }
    }
    // "http://localhost:3000/api/posts/all/staticParams"
  ).then((res) => res.json());

  return slugs.map((slug: string) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  
  const post: Post = await fetch(
    `${process.env.BASE_URL}/api/posts/getOne?slug=${slug}`
    // `http://localhost:3000/api/posts/getOne?slug=${slug}`
  ).then((res) => res.json());

  return {
    title: post.title,
    description: post.subtitle || "agoraportal.net",
    openGraph: {
      title: post.title,
      description: post.subtitle || "agoraportal.net",
      siteName: "Agora",
      images: [
        {
          url: post.image,
          width: 800,
          height: 600,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

const Page: React.FunctionComponent<Props> = async ({ params: { slug } }) => {
  // const postData = getPost(slug);
  // const post = await postData;

  const post = await prisma.post.findUnique({ 
    where: { 
        slug: slug,
        // archived: false
    },
    include: {
      author: true,
      category: {
        include: {
          subcategories: true
        }
      },
      subcategory: true,
      comments: {
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          author: true,
          replies: {
            orderBy: {
              createdAt: 'desc'
            },
            include: {
              author: true,
            }
          }
        }
      }
    }
  });

  if (post?.archived || !post) {
    notFound()
  }

  const categoryData = getCategory(post.categoryId);
  const subcategoryData = getSubcategory(post.subcategoryId as string);

  const category = await categoryData;
  const subcategory = await subcategoryData;

  return (
    <div className="min-h-[90vh] w-full bg-slate-50 dark:bg-[#040404]">
      {/* <Suspense fallback={<PostPageDetailsLoading />}> */}
      <PostPageDetails
        categoryId={post.categoryId}
        category={category}
        subcategory={subcategory}
        postId={post.id}
        // categoryPromise={categoryData}
        // subcategoryPromise={subcategoryData}
      />
      {/* </Suspense> */}
      <div className="container">
        <PostComponent categoryHex={category.hexCol as string} categoryName={category.name} subcategoryName={subcategory.name} post={post as PostWithEverything} />
      </div>
      <div className="w-full bg-card bottom-0 mt-5 border-b-[1px] border-solid border-secondary pt-5">
        <div className="">
          <PostComments postSlug={post.slug} postId={post.id} comments={post.comments} />
        </div>
      </div>
    </div>
  );
};

export default Page;