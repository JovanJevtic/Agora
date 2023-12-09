import { Suspense } from "react";
import { getCategorys } from "../createPost/page"
import Card from "./Card";
import { CategoryFallback } from "./Fallbacks";

const SubcategorysPage = async () => {
    const categorysData = getCategorys();    
    const categorys = await categorysData;

    return (
    <div className="">
        <div className="py-5 bg-card">
            <div className="container">
                <h1 className="text-lg font-bold text-center">Upravljanje subkategorijama</h1>
            </div>
        </div>
        <div className="container">
            <Suspense fallback={<CategoryFallback />}>
                {
                    categorys.map((category) => (
                        <Card category={category} />
                    ))
                }
            </Suspense>
        </div>
    </div>
  )
}

export default SubcategorysPage