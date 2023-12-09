
'use client';

import { Button } from "@/app/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/app/components/ui/collapsible";
import { Category, Subcategory } from "@prisma/client";
import { Suspense, useState } from "react";
import { SubcategoryFallback } from "./Fallbacks";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { FieldValues, useForm } from "react-hook-form";
import { TSSubcategoryCreation, subcategoryCreationFormSchema } from "@/app/libs/validation/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/app/components/ui/form";
import { useRouter } from "next/navigation";

type Props = {
    subcategorys: Subcategory[];
    category: Category;
}
const CardContent: React.FunctionComponent<Props> = ({ subcategorys, category }) => {
    const { refresh }  = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    // const [isDeleting, setIsDeleting] = useState(false);

    const form = useForm<TSSubcategoryCreation>({
        resolver: zodResolver(subcategoryCreationFormSchema),
        defaultValues: {
            categoryId: category.id,
            colorHex: '#000000',
            name: ''
        }
    });

    const {
        register,   
        handleSubmit,
        formState: { errors, isSubmitting, isLoading, isValid },
        reset,
        getValues,
        setError,
    } = form

    const onSubmit = async (data: FieldValues) => {
        try {
            const res = await fetch(`https://www.agoraportal.net/api/admin/createSubcategory`, {
                method: 'POST',
                body: JSON.stringify(data)
            })
            const resData = await res.json();
            console.log(resData);
            refresh()
        } catch (error: any) {
            throw new Error(error);
        }
    }

    const deleteSubcategory = async (subcategoryId: string) => {
        try {
            // setIsDeleting(true)
            const res = await fetch(`https://www.agoraportal.net/api/admin/createSubcategory`, {
                method: 'DELETE',
                body: JSON.stringify({subcategoryId})
            });
            const resData = await res.json();
            // setIsDeleting(false)
            refresh()
        } catch (error: any) {
            // setIsDeleting(false)
            // refresh()
            throw new Error(error)
        }
    }

  return (
    <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
    >
        <CollapsibleTrigger asChild>
            <Button className={`w-full rounded-none h-[50px]`} style={{ background: `${category.hexCol}` }} variant={"secondary"}>
                {category.name} { isOpen ? <ChevronUp className="ml-3" size={20} /> : <ChevronDown className="ml-3" size={20} /> }
            </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="bg-card rounded-b-md">
            <div className="border-b-[1px] border-solid border-secondary p-5">
                <p className="text-gray-500 mb-1">Dodaj novu subkategoriju:</p>
                <Form {...form} >
                    <form className="flex flex-col md:flex-row md:items-center" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex-[1]">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="">
                                        <FormControl className="h-12">
                                            <Input placeholder="Naziv..." {...field} />
                                        </FormControl>
                                        {/* <FormDescription className="ml-1">Dodaj novu subkategoriju..</FormDescription> */}
                                        <FormMessage style={{color: 'red'}} />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="min-w-min mt-3 md:mt-0 md:ml-3">
                            <Button type="submit" className="h-full" variant={"default"}>
                                Potvrdi
                                {
                                    (isSubmitting || isLoading) && <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                                }
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
            <Suspense fallback={<SubcategoryFallback />}>
                {
                    subcategorys.map((subcategory) => (
                        <div key={subcategory.id} className="flex items-center border-b-[1px] border-solid border-secondary cursor-pointer hover:bg-secondary transition">
                            <p className="text-sm flex-[1] p-4">{subcategory.name}</p>
                            <Button className="min-w-min mr-3" type="button" variant={"destructive"} onClick={() => {deleteSubcategory(subcategory.id)}}>
                                Ukloni
                                {
                                    // isDeleting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                                }
                            </Button>
                        </div>
                    ))
                }
            </Suspense>
        </CollapsibleContent>
    </Collapsible>
  )
}

export default CardContent