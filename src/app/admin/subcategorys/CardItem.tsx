import { Button } from "@/app/components/ui/button";
import { Subcategory } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
    subcategory: Subcategory;
}
const CardItem: React.FunctionComponent<Props> = ({ subcategory }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const { refresh } = useRouter()

    const deleteSubcategory = async (subcategoryId: string) => {
        try {
            setIsDeleting(true)
            const res = await fetch(`${process.env.BASE_URL}/api/admin/createSubcategory`, {
                method: 'DELETE',
                body: JSON.stringify({subcategoryId})
            });
            const resData = await res.json();
            setIsDeleting(false)
            refresh()
        } catch (error: any) {
            setIsDeleting(false)
            refresh()
            throw new Error(error)
        }
    }

  return (
    <div key={subcategory.id} className="flex items-center border-b-[1px] border-solid border-secondary cursor-pointer hover:bg-secondary transition">
        <p className="text-sm flex-[1] p-4">{subcategory.name}</p>
        <Button className="min-w-min mr-3" type="button" variant={"destructive"} onClick={() => {deleteSubcategory(subcategory.id)}}>
            Ukloni
            {
            isDeleting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            }
        </Button>
    </div>
  )
}

export default CardItem