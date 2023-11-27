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

const CreatePostForm = () => {
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
        mode: 'onTouched'
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
    } = form

    const onSubmit = async (data: FieldValues) => {
    }

    useEffect(() => {
        console.log(form.getValues("body"));
    }, [form.getValues("body"), form.getValues("title")])

    return (
        <div>
            <Form {...form}>
                <form>
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
                </form>
            </Form>
            <Button onClick={(e) => {e.preventDefault(); console.log(getValues("body"));}}>btn</Button>
        </div>
  )
}

export default CreatePostForm