'use client';

import { useForm } from "react-hook-form";
import { TSPostSearchForm, searchPostsFormSchema } from "../libs/validation/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { useDebounce } from "use-debounce";
import { useCallback, useEffect, useState } from "react";
import { Post } from "@prisma/client";
import ThumbnailCategory from "../components/ThumbnailCategory";
import useLocalStorage from "../libs/useLocalStorage";
import { usePersistForm } from "../libs/usePersistForm";
import { Loader, Loader2 } from "lucide-react";

type Props = {

}
const SearchForm = ({  }) => {

    const initialValues = {
        text: ''
    }

    const getSavedData = useCallback(() => {
        let data = typeof window !== "undefined" ? localStorage.getItem('searchVal') : null;
        if (data) {
         // Parse it to a javaScript object
            try {
                const resData = JSON.parse(data);
                return resData;
            } catch (err) {

          }
        }
        return initialValues;
    }, [initialValues]);
    
    const form = useForm<TSPostSearchForm>({
        resolver: zodResolver(searchPostsFormSchema),
        defaultValues: getSavedData()

    })   
    
    const {
        control,
        register,
        watch,
        handleSubmit,
        getValues
    } = form;

    const {
        text
    } = watch()

    const [debouncedValue] = useDebounce(text, 300)
    const [resPosts, setResPosts] = useState<Post[]>()

    const [noResponses, setNoResponses] = useState(false);

    // const [searchValueLocalStorage, setSearchValueLocalStorage] = useLocalStorage({ key: "searchValueLocalStorage", initialValue: debouncedValue })

    // useEffect(() => {
    //     setSearchValueLocalStorage(debouncedValue)
    // }, [debouncedValue] )

    const getPosts = async () => {
        try {
            const res = await fetch(`/api/posts/search?text=${debouncedValue}`, {
            // const res = await fetch(`http://localhost:3000/api/posts/search?text=${debouncedValue}`, {
                method: 'GET'
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data?.error)
            }
            if (data?.posts) {
                setResPosts(data.posts)
                if (data?.posts.length === 0) {
                    setNoResponses(true)
                } else {
                    setNoResponses(false)
                }
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }

    usePersistForm({ value: getValues(), localStorageKey: 'searchVal' });
 
    useEffect(() => {
        if (debouncedValue && debouncedValue.length > 0) {
            getPosts()
        } else {
            setResPosts([])
        }
    }, [debouncedValue])

    
    return(
        <div className="flex flex-col">
            <Form {...form}>
                <form>
                    <FormField 
                        control={control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <Input autoFocus className="h-12 mt-5 border-none rounded-none" placeholder="Pretržuj..." {...field} />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            
            <div className="mt-5 mb-5">
                {
                    resPosts && resPosts.length > 0 ? 
                    <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {
                            resPosts.map((post) => (
                                <div className="w-full h-full" key={post.id}> 
                                    <ThumbnailCategory post={post} />
                                </div>
                            ))
                        }
                    </div>
                    :
                    (
                            noResponses && debouncedValue.length > 0
                        ? 
                            <p className="text-gray-400">Nema poklapanja</p>
                        : 
                            <div className="w-full flex justify-center">
                                <p className="font-bold text-gray-400">Pretražuj i pronađi željene rezultate</p>
                            </div>
                    )
                }

                {
                    (debouncedValue.length > 0 && resPosts?.length === 0 && !noResponses) && <div className="w-full flex justify-center mt-10"><Loader2 className="text-primary" /></div>
                }
            </div>
        </div>
    );
}

export default SearchForm