import { Category, Subcategory } from "@prisma/client"
import CardContent from "./CardContent";

export const dynamic = 'force-dynamic'

const getSubcategoryByCategory = async (categoryId: string): Promise<Subcategory[]> => {
    try {
        const res = await fetch(`https://www.agoraportal.net/api/posts/subcategory/getByCategory?categoryId=${categoryId}`, {
            method: 'GET',
            cache: 'no-cache',
        });
        const data = res.json();
        return data
    } catch (error: any) {
        throw new Error(error)
    }
}

type Props = {
    category: Category;
}
const Card: React.FunctionComponent<Props> = async ({ category }) => {
    const subcategorysData = getSubcategoryByCategory(category.id);
    const subcategorys = await subcategorysData

  return (
    <div className="mt-0 w-full">
        {/* <h1 className="font-bold">{category.name}</h1>
        <Suspense fallback={<SubcategoryFallback />}>
            { subcategorys.map((subcategory) => (
                <Popover key={subcategory.id}>
                    <PopoverTrigger>Open</PopoverTrigger>
                    <PopoverContent>Place content for the popover here.</PopoverContent>
                </Popover>
            ))}

        </Suspense> */}

        <CardContent category={category} subcategorys={subcategorys} />

        {/* <Popover className="w-full">
            <PopoverTrigger asChild>
                <Button className="w-full" variant="outline">{category.name}</Button>
            </PopoverTrigger>
            <PopoverContent>
                <Suspense fallback={<SubcategoryFallback />}>
                    {
                        subcategorys.map((subcategory) => (
                            <div key={subcategory.id}>{subcategory.name}</div>
                        ))
                    }
                </Suspense>
            </PopoverContent>
        </Popover> */}
    </div>
  )
}


export default Card