import PostComponent from "@/app/components/Post/PostComponent";
import PostPageDetails, {
  PostPageDetailsLoading,
} from "@/app/components/PostPageDetails/PostPageDetails";
import { Category, Post, Subcategory } from "@prisma/client";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: {
    id: string;
  };
};

export const getPost = async (id: string): Promise<Post> => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/posts/getOne?id=${id}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    redirect("/");
    throw new Error(error);
  }
};

export const getCategory = async (categoryId: string): Promise<Category> => {
  try {
    const res = await fetch(
      `https://www.agoraportal.net/api/posts/category/getById?id=${categoryId}`,
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
      `https://www.agoraportal.net/api/posts/subcategory/getById?id=${subcategoryId}`,
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
  const ids = await fetch(
    "https://www.agoraportal.net/api/posts/all/staticParams"
  ).then((res) => res.json());

  return ids.map((id: string) => ({
    id: id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const post: Post = await fetch(
    `https://www.agoraportal.net/api/posts/getOne?id=${id}`
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

const Page: React.FunctionComponent<Props> = async ({ params: { id } }) => {
  const postData: Promise<Post> = getPost(id);
  const post = await postData;

  if (post.archived) {
    redirect('/')
  }

  const categoryData = getCategory(post.categoryId);
  const subcategoryData = getSubcategory(post.subcategoryId as string);

  const category = await categoryData;
  const subcategory = await subcategoryData;

  return (
    <div className="min-h-[90vh] w-full bg-slate-50 dark:bg-black">
      {/* <Suspense fallback={<PostPageDetailsLoading />}> */}
      <PostPageDetails
        categoryId={post.categoryId}
        category={category}
        subcategory={subcategory}
        // categoryPromise={categoryData}
        // subcategoryPromise={subcategoryData}
      />
      {/* </Suspense> */}
      <div className="container">
        <PostComponent categoryHex={category.hexCol as string} categoryName={category.name} subcategoryName={subcategory.name} post={post} />
      </div>
    </div>
  );
};

export default Page;
