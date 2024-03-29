import { Category, Post, Subcategory } from "@prisma/client"
import EditForm from './form'
import { getPost, getSubcategory } from "@/app/post/[slug]/page";
import { getCategorys, getSubcategorys } from "../../createPost/page";
import { PostWithEverything } from "@/types";

type Props = {
  params: {
    slug: string;
  };
};

// export async function generateStaticParams() {
//   const ids = await fetch(
//     "https://www.agoraportal.net/api/posts/all/staticParams"
//   ).then((res) => res.json());

//   return ids.map((id: string) => ({
//     id: id,
//   }));
// }

const EditPost: React.FunctionComponent<Props> = async ({ params: { slug } }) => {
  const postData: Promise<PostWithEverything> = getPost(slug);
  const post = await postData;

  const categorysData: Promise<Category[]> = getCategorys();
  const categorys = await categorysData;

  const subcategorysData: Promise<Subcategory[]> = getSubcategorys();
  const subcategorys = await subcategorysData;

  return (
    <div className="container">
        <h1>Uredjivanje objave</h1>
        <EditForm 
          categorys={categorys} 
          subcategorys={subcategorys} 
          post={post} 
        />
    </div>
  )
}

export default EditPost