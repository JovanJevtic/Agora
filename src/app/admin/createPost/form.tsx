'use client';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { TSPostWritingSchema, postCreationFormSchema } from "@/app/libs/validation/form";
import { Form } from "@/app/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";
import { Textarea } from "@/app/components/ui/textarea";
import Markdown from '@/app/components/Markdown/Markdown'
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import MdEditor from "@/app/components/MarkdownEditor";
import { Button } from "@/app/components/ui/button";
import { Category, Post, Subcategory, User } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Switch } from "@/app/components/ui/switch";
import axios from "axios";
import { Copy, Loader2, User as UserIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UploadButtonComponent from "@/app/components/ImageUploader";
import Image from "next/image";
import Link from "next/link";
import { z } from 'zod'
import PostCreationPreview from "@/app/components/PostCreationPreview";
import { usePersistForm } from "@/app/libs/usePersistForm";
import useLocalStorage from "@/app/libs/useLocalStorage";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Label } from "@radix-ui/react-label";

type Props = {
    categorys: Category[];
    user: User;
}

const FORM_DATA_KEY = "app_form_local_data";

const CreatePostForm: React.FunctionComponent<Props> = ({ categorys, user }) => {
    const [mounted, setMounted] = useState(false); // used for detecting renders

    useEffect(() => {
        setMounted(true);
    }, []);

    const initialValues = {
        body: "**Pisi ovdje!!!**",
        categoryId: "",
        fotoIzvor: "",
        image: "",
        positionPrimary: false,
        positionSecondary: false,
        // slug: '',
        subcategoryId: '',
        subtitle: '',
        title: ''
    }

    const [formShownLocalStorage, setformShownLocalStorage] = useLocalStorage({ key: "formOpened", initialValue: false })
    const [formShown, setFormShown] = useState(formShownLocalStorage);

    // const [formDataLocalStorage, setFormDataLocalStorage] = useLocalStorage({ key: "formData", initialValue: initialValues })
    // const [formData, setFormData] = useState(formDataLocalStorage);

    const [currStepLocalStorage, setCurrStepLocalStorage] = useLocalStorage({ key: "currStep", initialValue: 0 })
    const [currStep, setCurrStep] = useState<number>(currStepLocalStorage);

    const sections = [
        {
            id: 0,
            name: 'Opšte',
            requiredFields: ['title', 'image', 'subtitle', 'fotoIzvor']
        },
        {
            id: 1,
            name: 'Sadržaj',
            requiredFields: ['body']
        },
        {
            id: 2,
            name: 'Podešavanja',
            requiredFields: ['categoryId', 'subcategoryId', 'positionPrimary', 'positionSecondary']
        },
        {
            id: 3,
            name: 'Rezultat',
            requiredFields: []
        },
    ]

    const prev = () => {
        if (currStep > 0) {
            setCurrStep(step => step - 1)
        }    
    }

    type Inputs = z.infer<typeof postCreationFormSchema>
    type FieldName = keyof Inputs

    const next = async () => {
        const fields = sections[currStep].requiredFields;
        const output = await trigger(fields as FieldName[], { shouldFocus: true })

        if (!output) return
 
        if (currStep < sections.length - 1) {
            setCurrStep(step => step + 1)
        }
    }

    // const nextTo = async (sectionId: number) => {
    //     if (currStep > sectionId) {
    //         setCurrStep(sectionId)
    //     } else {
    //         sections.forEach(async (section) => {
    //             const fields = sections[section.id].requiredFields;
    //             const output = await trigger(fields as FieldName[], { shouldFocus: true })

    //             if (!output) {
    //                     // if (section.id  === currStep) {
    //                     //     return
    //                     // }
    //                 setCurrStep(section.id - 1)
    //                 return
    //             }
    //         })

    //         setCurrStep(sectionId)
    //     }
    // }

    const { data: userSession, status } = useSession()
    const router = useRouter();

    const [subcategorys, setSubcategorys] = useState<Subcategory[]>();

    const getAllSubcategorys = async () => {
        const res = await fetch(`https://www.agoraportal.net/api/posts/subcategory/getAll`, {
            method: "GET",
            cache: 'no-store'
        });
        const resData = await res.json();
        setSubcategorys(resData)
    }

    const getSavedData = useCallback(() => {
        let data = typeof window !== "undefined" ? localStorage.getItem(FORM_DATA_KEY) : null;
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

    const form = useForm<TSPostWritingSchema>({
        resolver: zodResolver(postCreationFormSchema),
        defaultValues: getSavedData() || {},
        // mode: 'onTouched'
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isLoading, isValid },
        reset,
        getValues,
        setError,
        watch,
        trigger,
        setValue,
        control,
        resetField,
    } = form

    usePersistForm({ value: getValues(), localStorageKey: FORM_DATA_KEY });

    // const [formErrorsLocalStorage, setformErrorsLocalStorage] = useLocalStorage({ key: 'formErrors', initialValue: errors })

    const [response, setResponse] = useState<string | null>(null);
    const [resError, setResError] = useState<string | null>(null);
    const [mdPreview, setMdPreview] = useState<MDXRemoteSerializeResult>()

    const postData = getValues()

    const { categoryId, image, subcategoryId, body, fotoIzvor, title, subtitle } = watch()
    const [filteredSubcategorys, setFilteredSubcategorys] = useState<Subcategory[]>()

    const filterSubcategorys = (categoryId: string) => {
        const filtered = subcategorys?.filter((curr) => { return curr.categoryId === categoryId })
        setFilteredSubcategorys(filtered)
    }

    const onSubmit = async (data: FieldValues) => {
        try {
            const slug = data.title.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
            const object = {
                ...data,
                slug
            }
            const res = await fetch(`https://www.agoraportal.net/api/admin/createPost`, {
                method: 'POST',
                body: JSON.stringify(object)
            });
            const resData = await res.json();
            if (!resData?.errors) {
                setFormShown(false)
                setCurrStep(0)
                reset(initialValues)
                router.push(`/post/${resData.post.slug}`)
            } else {
                if (resData?.errors?.title) {
                    setError("title", { message: resData.errors.title })
                    setCurrStep(0)
                    window.scrollTo(0, 0);
                }
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }

    const onDiscard = () => {
        setFormShown(false); 
        reset(initialValues)
    }

    useEffect(() => {
        if (status === "unauthenticated") {  
            router.push('/login')   
        }
        getAllSubcategorys()
    }, [])

    useEffect(() => {
        filterSubcategorys(categoryId)
    }, [categoryId])

    useEffect(() => {
        setformShownLocalStorage(formShown)
    }, [formShown])

    useEffect(() => {
        setCurrStepLocalStorage(currStep)
    }, [currStep])

    // useEffect(() => {
    //     console.log('aaa');
    //     setFormDataLocalStorage(watch())
    // }, [form])

    if (!mounted) {
        return <> </>
    }

    if (!formShown) {
        return(
            <div>
                <h1 className="font-bold mt-5 mb-5 text-2xl">Započni sa kreiranjem novog članka!</h1>
                <div className='w-min mb-5'>
                    <div>
                        <Link href={`/profile`} className='flex flex-col bg-card py-4 px-3 lg:px-7 rounded-md w-full md:max-w-md'>
                            <div className='flex justify-start items-center'>
                                <p>Autor: </p>
                                <div>
                                    <div className='flex items-center pl-3'>
                                        <p className='min-w-max font-bold'>{user.name}</p>
                                        {
                                            user.image ? 
                                                <div className='pl-2 min-w-full'><Image className='rounded-[50%]' width={24} height={24} alt='a' src={user.image} /> </div>
                                            : 
                                                <div className='pl-2 min-w-full'><UserIcon height={15} width={15} /></div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <p className='text-gray-500 text-sm mt-0'>{user.email}</p>
                        </Link>
                    </div>
                </div>   
                <Button className="font-bold h-[45px] w-full md:max-w-md" onClick={() => setFormShown(true)} variant={"default"}>Započni sa pisanjem novog članka!</Button>
            </div>
        )
    }

    return (
        <div className="w-full">
            <nav className="w-full mt-0"> 
                <ul className="list-none sticky top-0 flex w-full justify-between border-solid border-t-[1px] border-t-secondary">
                    {
                        sections.map((section) => (
                            <div 
                                // onClick={() => {nextTo(section.id)}} 
                                className={`${currStep === section.id && 'text-red-600' && 'border-solid border-t-[1px] border-primary bg-card'} ${currStep >= section.id && 'border-solid border-t-[1px] border-primary'} flex-[1] justify-center flex cursor-pointer hover:bg-secondary transition`} key={section.id}
                            >
                                <p className={`pt-5 pb-5 ${currStep === section.id && 'text-white font-bold'} text-gray-400 text-xs lg:text-sm`}>{section.name}</p>
                            </div>
                        ))
                    }
                </ul>
            </nav>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    {
                        currStep === 0 && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="mt-5">
                                            <FormLabel className="">Naslov</FormLabel>
                                            <FormControl className="h-12">
                                                <Input className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1" placeholder="Definiši naslov članka" {...field} />
                                            </FormControl>
                                            <FormMessage style={{color: 'red'}} />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="subtitle"
                                    render={({ field }) => (
                                        <FormItem className="mt-5">
                                            <FormLabel>Podnaslov</FormLabel>
                                            <FormControl className="h-12">
                                                <Textarea className="resize-none" placeholder="Definiši naslov članka" {...field} />
                                            </FormControl>
                                            <FormDescription className="text-sm text-gray-500">
                                                *Podnaslov moze biti i prazan u najgorem slucaju.
                                            </FormDescription>
                                            <FormMessage style={{color: 'red'}} />
                                        </FormItem>
                                    )}
                                />

                                <div className="mt-5 flex flex-col lg:flex-row">  
                                    <FormField
                                        control={form.control}
                                        name="image"
                                        render={({ field }) => (
                                            <FormItem className="mt-2 flex-[1]">
                                                <FormLabel>Naslovna slika</FormLabel>
                                                <FormControl className="">
                                                    {/* <Input placeholder="Zalijepi link do slike" {...field} /> */}
                                                    <UploadButtonComponent
                                                        onChange={field.onChange}
                                                        value={field.value}
                                                    />
                                                </FormControl>
                                                <FormMessage style={{color: 'red'}} />
                                            </FormItem>
                                        )}
                                    />
                                    
                                    <div className="flex-1 pt-10 lg:pl-5">
                                        <div className="rounded-lg h-[100%] w-[100%] bg-secondary border-solid border-[1px] border-secondary">
                                            { image.length > 0 && 
                                                <Image
                                                    width={0}
                                                    height={0}
                                                    sizes="100vw"
                                                    style={{ width: '100%', height: 'auto' }} // optional
                                                    src={image} alt="a"
                                                    loading="eager"
                                                    // style={{objectFit:"cover", objectPosition: 'top'}}
                                                />  
                                            }
                                        </div>
                                    </div>
                                </div>
                                                    
                                <FormField
                                    control={form.control}
                                    name="fotoIzvor"
                                    render={({ field }) => (
                                        <FormItem className="mt-5">
                                            <FormLabel>Foto izvor</FormLabel>
                                            <FormControl className="h-12">
                                                <Input placeholder="Definiši izvor porijekla fotografije" {...field} />
                                            </FormControl>
                                            <FormMessage style={{color: 'red'}} />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )
                    }

                    {
                        currStep === 1 && (
                            <>
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
                            </>
                        )
                    }
                    
                    {
                        currStep === 2 && (
                            <>
                                {/* <FormField
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
                                /> */}

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
                                                <Input disabled placeholder="Prvo kategorija mora biti selektovana" />
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
                                                                    <SelectItem key={subcategorys.id} value={subcategorys.id}>{subcategorys.name}</SelectItem>
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
                            </>
                        )
                    }

                    {
                        currStep === 3 && (
                            <div className="mt-10">

                                <PostCreationPreview 
                                    author={userSession?.user as User}
                                    category={categorys.filter((category) => category.id === categoryId)[0]}
                                    categoryHex={categorys.filter((category) => category.id === categoryId)[0].hexCol as string}
                                    content={body}
                                    createdAt={new Date}
                                    fotoIzvor={fotoIzvor}
                                    image={image}
                                    subcategory={subcategorys?.filter((subcategory) => subcategory.id === subcategoryId)[0] as Subcategory}
                                    subcategorys={filteredSubcategorys as Subcategory[]}
                                    subtitle={subtitle}
                                    title={title}
                                />  

                                <Button className="mt-5 w-full font-bold" disabled={isSubmitting || isLoading } type="submit" variant={"default"}>
                                {
                                    (isSubmitting || isLoading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                }
                                Objavi
                            </Button>
                            </div>
                        )
                    }

                    <div className="mt-5 flex">
                        <div className="flex-1 flex justify-start">
                            {
                                currStep === 0 && 
                                // <Button type="button" className="px-10" variant={"destructive"} onClick={() => {onDiscard()}}>Odustani</Button>
                                <Dialog >
                                    <DialogTrigger asChild>
                                        <Button variant="destructive">Otkaži</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md border-secondary">
                                        <DialogHeader>
                                            <DialogTitle>Otkaži unos</DialogTitle>
                                            <DialogDescription>
                                                Ako otkažeš predhodno uneseni sadržaj će biti obirsan.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter className="sm:justify-start">
                                            <DialogClose asChild>
                                                <div>
                                                    <Button type="button" className="" variant={"destructive"} onClick={() => {onDiscard()}}>Otkaži</Button>
                                                    {/* <Button type="button" variant="secondary" onClick={() => {setDialogOpen(false)}}>
                                                        Zatvori
                                                    </Button> */}
                                                    <DialogTrigger asChild>
                                                        <Button type="button" className="ml-3" variant="outline" onClick={() => {}}>
                                                            Zatvori
                                                        </Button>
                                                    </DialogTrigger>
                                                </div>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            }
                            {
                                currStep > 0 && <Button className="px-10" type="button" variant={"outline"} onClick={() => {prev()}}>Natrag</Button>
                            }
                        </div>

                        <div className="flex-1 flex justify-end">
                            {
                                currStep < sections.length - 1 && <Button className="w-[140px] font-bold" type="button" onClick={() => (next())}>Dalje</Button>
                            }
                        </div>
                    </div>
                </form>
            </Form>
        </div>
  )
}

export default CreatePostForm