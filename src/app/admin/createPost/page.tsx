import WriteForm from "./form";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { Category, Subcategory, User } from "@prisma/client";

const CreatePost = async () => {
  const session = await getServerSession();

  const categorysData: Promise<Category[]> = getCategorys();
  // const subcategorysData: Promise<Subcategory[]> = getSubcategorys();

  const categorys = await categorysData;
  // const subcategorys = await subcategorysData;

  return (
    <div className="container">
      <WriteForm
        categorys={categorys}
        user={session?.user as User}
        // subcategorys={subcategorys}
      />
    </div>
  );
};

export default CreatePost;

const getCategorys = async (): Promise<Category[]> => {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/posts/category/getAll`,
      {
        cache: "no-store",
        method: "GET",
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getSubcategorys = async (): Promise<Subcategory[]> => {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/posts/subcategory/getAll`,
      {
        method: "GET",
        next: {
          revalidate: 1,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export { getCategorys, getSubcategorys };
