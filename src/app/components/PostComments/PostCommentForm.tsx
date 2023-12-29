import { TSCommentCreationForm, commentCreationFormSchema } from "@/app/libs/validation/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValue, FieldValues, useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from '@/app/components/ui/input'
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Textarea } from "../ui/textarea"
import { useSession } from "next-auth/react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import Link from "next/link"

type Props = {
    isReply: boolean;
    parrentCommentId: string;
    postId: string;
    setIsSubmitting: (arg: boolean) => void;
    setShown: (arg: boolean) => void;
}

const PostCommentForm = ({ isReply, postId, parrentCommentId, setIsSubmitting, setShown }: Props) => {
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

    const onSubmit = async (data: FieldValues) => {
        try {
            if (status !== "authenticated") {
                setDialogOpen(true)
                return
            }

            setIsSubmitting(true)

            const dataToSend = {
                ...data,
                isReply,
                postId,
                parrentCommentId
            }

            const res = await fetch(`${process.env.BASE_URL}/api/comments/comment`, {
                body: JSON.stringify(dataToSend),
                method: 'POST'
            })
            
            const resData = await res.json();
            if (!resData?.errors) {
                reset(initialValues)
                refresh();                
                setIsSubmitting(false)
            }
        } catch (error: any) {
            setIsSubmitting(false)
            throw new Error(error)  
        }
    }
    
    return (
    <div className="w-full mt-3 transition-all">
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input className="border-t-0 border-l-0 border-r-0 rounded-none" placeholder="Dodaj komentar..." {...field} />
                            </FormControl>
                            <FormMessage style={{color: 'red'}} />
                        </FormItem>
                    )}
                />

                <div className="w-full flex justify-end mt-3">
                    <Button type="button" variant={"secondary"} className="h-[34px] text-xs mr-3" onClick={() => setShown(false)}>
                        Odustani
                    </Button>
                    <Button disabled={isSubmitting || isLoading || text.length < 1 } type="submit" className="h-[34px] text-xs">
                        Komentariši
                        {
                            (isSubmitting || isLoading) && <Loader2 className="ml-2 mr-2 h-4 w-4 animate-spin" />
                        }
                    </Button>
                </div>
            </form>
        </Form>
    </div>
  )
}

export default PostCommentForm