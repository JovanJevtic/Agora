"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import {
  TSPostWritingSchema,
  postCreationFormSchema,
} from "@/app/libs/validation/form";
import { Form } from "@/app/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Textarea } from "@/app/components/ui/textarea";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import MdEditor from "@/app/components/MarkdownEditor";
import { Button } from "@/app/components/ui/button";
import { Category, Post, Subcategory } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Switch } from "@/app/components/ui/switch";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UploadButtonComponent from "@/app/components/ImageUploader";
import Image from "next/image";
import { getSubcategorys } from "../../createPost/page";
import { PostWithEverything } from "@/types";

type Props = {
  categorys: Category[];
  subcategorys: Subcategory[];
  post: PostWithEverything;
};

const EditPostForm: React.FunctionComponent<Props> = ({
  categorys,
  post,
  subcategorys,
}) => {
  const { data: userSession, status } = useSession();
  const { push, refresh } = useRouter();

  const [filteredSubcategorys, setFilteredSubcategorys] =
    useState<Subcategory[]>();

  const filterSubcategorys = (categoryId: string) => {
    const filtered = subcategorys?.filter((curr) => {
      return curr.categoryId === categoryId;
    });
    setFilteredSubcategorys(filtered);
  };

  const form = useForm<TSPostWritingSchema>({
    resolver: zodResolver(postCreationFormSchema),
    defaultValues: {
      body: post.body,
      categoryId: post.categoryId,
      fotoIzvor: post.fotoIzvor,
      image: post.image,
      positionPrimary: post.positionPrimary as boolean,
      positionSecondary: post.positionSecondary as boolean,
      // slug: post.slug,
      subcategoryId: post.subcategoryId as string,
      subtitle: post.subtitle,
      title: post.title,
      izvor: post.izvor || "",
    },
    // mode: 'onTouched'
  });

  const [response, setResponse] = useState<string | null>(null);
  const [resError, setResError] = useState<string | null>(null);
  const [mdPreview, setMdPreview] = useState<MDXRemoteSerializeResult>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading, isValid },
    reset,
    getValues,
    setError,
    watch,
  } = form;

  const { categoryId, image } = watch();

  const onSubmit = async (data: FieldValues) => {
    try {
      const slug = data.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-");
      const object = {
        ...data,
        authorId: userSession?.user.id as string,
        slug,
      };
      const res = await fetch(
        `${process.env.BASE_URL}/api/admin/createPost?id=${post.id}`,
        {
          // const res = await fetch(`http://localhost:3000/api/admin/createPost?id=${post.id}`, {
          method: "PUT",
          body: JSON.stringify(object),
        }
      );
      const resData = await res.json();
      console.log(resData, "resData");
      push(`/post/${resData.post.slug}`);
      refresh();
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    filterSubcategorys(categoryId);
  }, [categoryId]);

  useEffect(() => {
    if (status === "unauthenticated") {
      push("/login");
    }
  }, []);

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
                  <Input
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                    placeholder="Dodaj naslov članku..."
                    {...field}
                  />
                </FormControl>
                <FormMessage style={{ color: "red" }} />
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
                  <Textarea
                    className="resize-none"
                    placeholder="Dodaj podnaslov članku..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Podnaslov moze biti i prazan u najgorem slucaju.
                </FormDescription>
                <FormMessage style={{ color: "red" }} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="izvor"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel>Izvor</FormLabel>
                <FormControl className="h-12">
                  <Input
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                    placeholder="Navedi izvor članka"
                    {...field}
                  />
                </FormControl>
                <FormMessage style={{ color: "red" }} />
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
                <FormMessage style={{ color: "red" }} />
              </FormItem>
            )}
          />

          {mdPreview?.compiledSource && <MDXRemote {...mdPreview} />}

          {
            image.length > 0 && (
              // <div className="w-full relative">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }} // optional
                src={image}
                alt="a"
                loading="eager"
                // style={{objectFit:"cover", objectPosition: 'top'}}
              />
            )
            // </div>
          }

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Naslovna slika</FormLabel>
                <FormControl className="h-12">
                  {/* <Input placeholder="Zalijepi link do slike" {...field} /> */}
                  <UploadButtonComponent
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage style={{ color: "red" }} />
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
                <FormMessage style={{ color: "red" }} />
              </FormItem>
            )}
          />

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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selektuj kategoriju kojoj pripada" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categorys.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {categoryId.length < 1 ? (
            <FormField
              control={form.control}
              name="subcategoryId"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>Subkategorija</FormLabel>
                  <Input
                    disabled
                    placeholder="Selektuj subkategoriju kojoj pripada"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="subcategoryId"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>Subkategorija</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selektuj subkategoriju kojoj pripada" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredSubcategorys?.map((subcategory) => (
                        <SelectItem key={subcategory.id} value={subcategory.id}>
                          {subcategory.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="positionPrimary"
            render={({ field }) => (
              <FormItem className="mt-10 flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Primarna pozicija</FormLabel>
                  <FormDescription>
                    Clanak ce biti smjestena na primarno mjesto na pocetku
                    stranice
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
                  <FormLabel className="text-base">
                    Sekundarna pozicija
                  </FormLabel>
                  <FormDescription>
                    Clanak ce biti smjestena na sekundarni mjesto na pocetku
                    stranice
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
          <Button
            className="mt-5 w-full font-bold"
            disabled={isSubmitting || isLoading}
            type="submit"
            variant={"default"}
          >
            {(isSubmitting || isLoading) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Potvrdi
          </Button>

          {/* <Button variant={"default"} type="submit" className="bg-green-600 w-full font-bold mt-10 text-white">Potvrdi</Button> */}
        </form>
      </Form>
    </div>
  );
};

export default EditPostForm;
