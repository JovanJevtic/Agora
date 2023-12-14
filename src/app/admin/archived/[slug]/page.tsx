import PostPageDetails from "@/app/components/PostPageDetails/PostPageDetails";
import { getCategory, getPost, getSubcategory } from "@/app/post/[slug]/page";
import { Post } from "@prisma/client"
import PostComponent from "@/app/components/Post/PostComponent";

type Props = {
    params: {
      slug: string;
    }
};

// export async function generateStaticParams() {
//     const ids = await fetch(
//       "https://www.agoraportal.net/api/posts/all/staticParams/archived"
//     ).then((res) => res.json());
  
//     return ids.map((id: string) => ({
//       id: id,
//     }));
// }

const ArchivedPost: React.FunctionComponent<Props> = async ({ params: { slug } }) => {
    const postData: Promise<Post> = getPost(slug);
  const post = await postData;

  const categoryData = getCategory(post.categoryId);
  const subcategoryData = getSubcategory(post.subcategoryId as string);

  const category = await categoryData;
  const subcategory = await subcategoryData;


  return (
    <div className="min-h-[90vh] w-full bg-slate-50 dark:bg-black">
        <div className="bg-gray-700 h-20">
            <div className="container flex items-center justify-center h-[100%] w-[100%]">
                <h1 className="text-3xl font-bold">ARHIVIRANO</h1>
            </div>
        </div>
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
}

export default ArchivedPost