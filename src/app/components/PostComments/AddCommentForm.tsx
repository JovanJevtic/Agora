'use client'

import { TSCommentCreationForm, commentCreationFormSchema } from "@/app/libs/validation/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useOptimistic, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import Link from "next/link"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Loader2 } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { CommentWithReplies } from "@/types"
import { startTransition } from 'react';
import AddCommentBtn from "./AddCommentBtn"
import PostComment from "./PostComment"
import { Comment, User } from "@prisma/client"
import { v4 as uuid } from 'uuid'
import { revalidatePath } from "next/cache"

type Props = {
    postId: string;
    comments: CommentWithReplies[];
    postSlug: string;
    createComment: (postId: string, isReply: boolean, parrentCommentId: string | null, formData: FormData) => void;
    // addOptimistic: (comm: string) => void;
}

const AddCommentForm = ({ postId, comments, postSlug, createComment }: Props) => {
    const { refresh } = useRouter()
    const { data: session, status } = useSession()
   
    const [dialogOpen, setDialogOpen] = useState(false);


    const initialValues = {
        text: ''    
    }

    const form = useForm<TSCommentCreationForm>({
        resolver: zodResolver(commentCreationFormSchema),
        defaultValues: initialValues
    })

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

    const { text } = watch()

    // const [optimisticComments, addOptimisticComment] = useOptimistic<CommentWithReplies[]>(
    //     comments,
    //     (currComments: CommentWithReplies[], newComment: CommentWithReplies) => [
    //         ...currComments,
    //         { 
    //             author: session.data?.user as User,
    //             authorId: session.data?.user.id as string,
    //             createdAt: new Date(Date.now()),
    //             updatedAt: new Date(Date.now()),
    //             id: (Math.random() + 1).toString(36).substring(7),
    //             isReply: false,
    //             parrentCommentId: null,
    //             postId: postId,
    //             replies: [],
    //             text: newComment as string 
    //         }
    //     ]
    // )

    const [optimisticComments, addOptimisticComment] = useOptimistic(
        comments, 
        (prevComments, newComment) => [
            { 
                author: session?.user as User,
                authorId: session?.user.id as string,
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
                id: uuid(),
                isReply: false,
                parrentCommentId: null,
                postId: postId,
                replies: [],
                text: newComment as string 
            },
            ...prevComments,
            // { 
            //     author: session?.user as User,
            //     authorId: session?.user.id as string,
            //     createdAt: new Date(Date.now()),
            //     updatedAt: new Date(Date.now()),
            //     id: uuid(),
            //     isReply: false,
            //     parrentCommentId: null,
            //     postId: postId,
            //     replies: [],
            //     text: newComment as string 
            // }
        ]
    )

    const submitAction = async (formData: FormData) => {
        if (status !== "authenticated") {
            setDialogOpen(true)
            return
        }

        const text = formData.get("text");
        addOptimisticComment(text)

        const createFullComment = createComment.bind(null, postId, false, null)
        const res = await createFullComment(formData)
        reset(initialValues)
    }

    const onSubmit = async (data: FieldValues) => {
        try {
            if (status !== "authenticated") {
                setDialogOpen(true)
                return
            }

            const dataToSend = {
                ...data,
                isReply: false,
                postId,
                parrentCommentId: null
            }

            const res = await fetch(`${process.env.BASE_URL}/api/comments/comment`, {
                body: JSON.stringify(dataToSend),
                method: 'POST'
            })
            
            const resData = await res.json();
            if (!resData?.errors) {
                reset(initialValues)
                // refresh();                
            }
        } catch (error: any) {
            throw new Error(error)  
        }
    }

    return (
        <div>
        <div className="container">
            <h1 className="pb-5 font-bold text-xl">Komentari: </h1>
            {/* <AddCommentForm addOptimistic={addOptimisticComment} postId={postId} /> */}
            <div>
                <Dialog open={dialogOpen} onOpenChange={(arg) => setDialogOpen(arg)}>
                    <DialogContent className="sm:max-w-md border-secondary">
                        <DialogHeader>
                            <DialogTitle>Niste prijavljeni</DialogTitle>
                            <DialogDescription>
                                Potrebno je da budete prijavljeni na Vaš račun da biste imali pristup komentarisanju.
                                <p className="mt-3 text-primary">
                                    <Link href={`/login`} className="underline">Prijavite se ovdje uz Google na svega jedan klik!</Link>
                                </p>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <div>
                                    <Button type="button" className="" variant={"default"}>
                                        <Link href={`/register`}>Registruj se</Link>
                                    </Button>
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

                <Form {...form}>
                    <form action={async (formData) => await submitAction(formData)} 
                        // onSubmit={handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea className="" placeholder="Dodaj komentar..." {...field} />
                                    </FormControl>
                                    <FormMessage style={{color: 'red'}} />
                                </FormItem>
                            )}
                        />

                        <div className="w-full flex justify-end mt-3 mb-5">
                            <AddCommentBtn text={text} />
                        </div>
                    </form>
                </Form>
            </div>
        </div>
        {
            optimisticComments.map((comment) => (
                <PostComment key={comment.id} postId={postId} comment={comment} />
            ))
        }
    </div>
  )
}

export default AddCommentForm