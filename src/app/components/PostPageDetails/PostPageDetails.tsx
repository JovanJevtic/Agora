import { Category, Subcategory } from "@prisma/client"
import { Skeleton } from "../ui/skeleton"

type Props = {
    categoryPromise: Promise<Category>
    subcategoryPromise: Promise<Subcategory>
}

const PostPageDetails: React.FunctionComponent<Props> = async ({ categoryPromise, subcategoryPromise }) => {
    const category = await categoryPromise;
    const subcategory = await subcategoryPromise;

    console.log(category);

  return (
    <div className={`bg-[#${category.hexCol}]`}>
        <div className="container">
            <h1>{category.name}</h1>
            <p>{subcategory.name}</p>   
        </div>
    </div>
  )
}

export const PostPageDetailsLoading = () => {
    return (
        <Skeleton className="h-20 w-full"></Skeleton>
    )
}

export default PostPageDetails