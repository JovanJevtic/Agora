import { Category, Prisma, Subcategory } from "@prisma/client"
import { Skeleton } from "../ui/skeleton"
import Link from "next/link";

type Props = {
    // categoryPromise: Promise<Category>;
    // subcategoryPromise: Promise<Subcategory>;
    category: Category;
    subcategory: Subcategory;
    categoryId: string;
    postId: string;
}

const getAllSubcategorys = async (categoryId: string) => {
    const res = await fetch(`https://www.agoraportal.net/api/posts/category/getSubcategorys?id=${categoryId}`, {
        method: 'GET',
        cache: 'no-cache'
    });
    const data = await res.json();
    return data;
}

const PostPageDetails: React.FunctionComponent<Props> = async ({
    categoryId,
    category, 
    subcategory,
    postId
    // categoryPromise, subcategoryPromise,  
}) => {
    // const category = await categoryPromise;
    // const subcategory = await subcategoryPromise;

    const subcategorysData: Promise<Subcategory[]> = getAllSubcategorys(categoryId)
    const subcategorys = await subcategorysData;

    const first = subcategorys.filter((bla) => bla.id === subcategory.id);
    const other = subcategorys.filter((bla) => bla.id !== subcategory.id)

    const categoryHex = category.hexCol;

  return (
    <div className={`h-28 mb-10`}>
        <div className="dark:bg-secondary bg-white flex flex-col h-full">
            <Link href={`/category/${category.name}`} style={{ background: `${category.hexCol}` }} className="flex-[4] flex items-center justify-start border-[#333] border-b-[0px] border-solid">
                <div className="container">
                    <h1 className="uppercase text-3xl font-bold text-white">{category.name}</h1>
                </div>    
            </Link>
            <div className="flex-[2] container px-[2rem]">
                <ul className="flex w-full h-full justify-start items-center overflow-x-scroll no-scrollbar">
                    <Link 
                        key={first[0].id} 
                        style={{
                            background: first[0].name === subcategory?.name ? `${category.hexCol}`: '', 
                        }} 
                        className={
                            `h-full transition mr-0 hover:bg-[${categoryHex}] hover:dark:bg-[${categoryHex}]
                            min-w-fit
                            px-1
                            ${first[0].name === subcategory?.name ? `border-none font-bold text-white` : 'bg-slate-50 dark:bg-black'}
                        `} 
                        href={``}
                    >
                        <li className={`h-full flex items-center pl-5 pr-5`}>
                            <p className="text-xs md:text-sm">{first[0].name}</p>
                        </li>
                    </Link>
                    
                    {
                       other.map(subcategoryCard => (
                        <Link 
                            key={subcategoryCard.id} 
                            style={{
                                background: subcategoryCard.name === subcategory?.name ? `${category.hexCol}`: '', 
                            }} 
                            className={
                                `h-full transition mr-0 hover:bg-[${categoryHex}] hover:dark:bg-[${categoryHex}]
                                min-w-fit
                                px-1
                                ${subcategoryCard.name === subcategory?.name ? `border-none font-bold text-white` : 'bg-slate-50 dark:bg-black'}
                            `} 
                            href={``}
                        >
                            <li className={`h-full flex items-center pl-5 pr-5`}>
                                <p className="text-xs md:text-sm">{subcategoryCard.name}</p>
                            </li>
                        </Link>       
                       ))
                    }
                </ul>
            </div>
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