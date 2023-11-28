'use client';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { TSPostWritingSchema, postCreationFormSchema } from "@/app/libs/validation/form";
import { Form } from "@/app/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";
import { Textarea } from "@/app/components/ui/textarea";
import Markdown from '@/app/components/Markdown/Markdown'
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import MdEditor from "@/app/components/MarkdownEditor";
import { Button } from "@/app/components/ui/button";
import { Category, Post, Subcategory } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Switch } from "@/app/components/ui/switch";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation'

type Props = {
    categorys: Category[];
    subcategorys: Subcategory[];
}

const CreatePostForm: React.FunctionComponent<Props> = ({ categorys, subcategorys }) => {
    const { data: userSession, status } = useSession()

    const form = useForm<TSPostWritingSchema>({
        resolver: zodResolver(postCreationFormSchema),
        defaultValues: {
            body: "**Pisi ovdje!!!**",
            categoryId: "",
            fotoIzvor: "",
            image: "",
            positionPrimary: false,
            positionSecondary: false,
            slug: '',
            subcategoryId: '',
            subtitle: '',
            title: ''
        },
        // mode: 'onTouched'
    });

    const [response, setResponse] = useState<string | null>(null);
    const [resError, setResError] = useState<string | null>(null);
    const [mdPreview, setMdPreview] = useState<MDXRemoteSerializeResult>()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isLoading, isValid },
        reset,
        getValues,
        setError,
        watch,
    } = form

    const { categoryId } = watch()
    const [filteredSubcategorys, setFilteredSubcategorys] = useState<Subcategory[]>()

    const filterSubcategorys = (categoryId: string) => {
        const filtered = subcategorys.filter((curr) => { return curr.categoryId === categoryId })
        setFilteredSubcategorys(filtered)
    }

    const onSubmit = async (data: FieldValues) => {
        try {
            const object = {
                ...data,
                authorId: userSession?.user.id as string
            }
            const res = await fetch(`https://www.agoraportal.net/api/admin/createPost`, {
                method: 'POST',
                body: JSON.stringify(object)
            });
            const resData: Post = await res.json();
            redirect(`/`)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(errors);
    }, [errors])

    useEffect(() => {
        filterSubcategorys(categoryId)
    }, [categoryId])

    useEffect(() => {
        if (status === "unauthenticated") {  
            redirect('/login')   
        }
    }, [])

    return (
        <div>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="mt-2">
                                <FormLabel>Naslov</FormLabel>
                                <FormControl className="h-12">
                                    <Input className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1" placeholder="Dodaj naslov članku..." {...field} />
                                </FormControl>
                                <FormMessage style={{color: 'red'}} />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="subtitle"
                        render={({ field }) => (
                            <FormItem className="mt-2">
                                <FormLabel>Podnaslov</FormLabel>
                                <FormControl className="h-12">
                                    <Textarea className="resize-none" placeholder="Dodaj podnaslov članku..." {...field} />
                                </FormControl>
                                <FormDescription>
                                    Podnaslov moze biti i prazan u najgorem slucaju.
                                </FormDescription>
                                <FormMessage style={{color: 'red'}} />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="body"
                        render={({ field }) => (
                            <FormItem className="mt-5 mb-5" defaultValue={"bla"}>
                                <FormLabel>Sadrzaj</FormLabel>
                                <FormControl className="h-12">
                                    {/* <Textarea className="resize-y h-72" placeholder="Dodaj sadrzaj članku..." {...field} /> */}
                                    <MdEditor
                                        // onChange={field.onChange} 
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage style={{color: 'red'}} />
                            </FormItem>
                        )}
                    />

                    { mdPreview?.compiledSource && <MDXRemote {...mdPreview} /> }

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem className="mt-2">
                                <FormLabel>Link do naslovne slike</FormLabel>
                                <FormControl className="h-12">
                                    <Input placeholder="Zalijepi link do slike" {...field} />
                                </FormControl>
                                <FormMessage style={{color: 'red'}} />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="fotoIzvor"
                        render={({ field }) => (
                            <FormItem className="mt-2">
                                <FormLabel>Foto izvor</FormLabel>
                                <FormControl className="h-12">
                                    <Input placeholder="Unos izvora slike" {...field} />
                                </FormControl>
                                <FormMessage style={{color: 'red'}} />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem className="mt-2">
                                <FormLabel>Text linka</FormLabel>
                                <FormControl className="h-12">
                                    <Input placeholder="*bez razmaka (npr. ovo-je-primjer)" {...field} />
                                </FormControl>
                                <FormMessage style={{color: 'red'}} />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="mt-3">
                                <FormLabel>Kategorija</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selektuj kategoriju kojoj pripada" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                        categorys.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                        ))
                                        }
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {
                        categoryId.length < 1 ?
                        <FormField
                            control={form.control}
                            name="subcategoryId"
                            render={({ field }) => (
                                <FormItem className="mt-3">
                                    <FormLabel>Subkategorija</FormLabel>
                                    <Input disabled placeholder="Selektuj subkategoriju kojoj pripada" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        :
                        <FormField
                            control={form.control}
                            name="subcategoryId"
                            render={({ field }) => (
                                <FormItem className="mt-3">
                                    <FormLabel>Subkategorija</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selektuj subkategoriju kojoj pripada" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                                {
                                                    filteredSubcategorys?.map((subcategorys) => (
                                                        <SelectItem key={subcategorys.id} value={subcategorys.name}>{subcategorys.name}</SelectItem>
                                                    ))
                                                }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    }

                    <FormField
                        control={form.control}
                        name="positionPrimary"
                        render={({ field }) => (
                            <FormItem className="mt-10 flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Primarna pozicija</FormLabel>
                                <FormDescription>
                                Clanak ce biti smjestena na primarno mjesto na pocetku stranice
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    // disabled
                                    aria-readonly
                                />
                            </FormControl>  
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="positionSecondary"
                        render={({ field }) => (
                            <FormItem className="mt-3 flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Sekundarna pozicija</FormLabel>
                                <FormDescription>
                                Clanak ce biti smjestena na sekundarni mjesto na pocetku stranice
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    // disabled
                                    aria-readonly
                                />
                            </FormControl>  
                            </FormItem>
                        )}
                    />
                    <Button className="mt-5 w-full font-bold" disabled={isSubmitting || isLoading } type="submit" variant={"default"}>
                            {
                                (isSubmitting || isLoading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            }
                            Potvrdi
                    </Button>

                    {/* <Button variant={"default"} type="submit" className="bg-green-600 w-full font-bold mt-10 text-white">Potvrdi</Button> */}
                </form>
            </Form>
        </div>
  )
}

export default CreatePostForm