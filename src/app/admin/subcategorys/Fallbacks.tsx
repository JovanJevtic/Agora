import { Skeleton } from "@/app/components/ui/skeleton"

export const CategoryFallback = () => {
  return (
    <div className="w-full">
      <Skeleton className="h-[50px] w-[full]" />
      <div className=" flex flex-col items-end">
        <Skeleton className="w-[70%] h-[30px] mt-3" />
        <Skeleton className="w-[70%] h-[30px] mt-3" />
        <Skeleton className="w-[70%] h-[30px] mt-3" />
      </div>
    </div>
  )
}

export const SubcategoryFallback = () => {
  return <Skeleton className="h-[30px] w-[70%]"></Skeleton>
}