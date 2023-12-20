'use client'

import { TSCommentCreationForm, commentCreationFormSchema } from "@/app/libs/validation/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import Link from "next/link"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Loader2 } from "lucide-react"
import { Textarea } from "../ui/textarea"


type Props = {
    postId: string
}
const AddCommentForm = ({ postId }: Props) => {
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

            const dataToSend = {
                ...data,
                isReply: false,
                postId,
                parrentCommentId: null
            }

            const res = await fetch(`https://www.agoraportal.net/api/comments/comment`, {
                body: JSON.stringify(dataToSend),
                method: 'POST'
            })
            
            const resData = await res.json();
            if (!resData?.errors) {
                reset(initialValues)
                refresh();                
            }
        } catch (error: any) {
            throw new Error(error)  
        }
    }

    return (
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
            <form onSubmit={handleSubmit(onSubmit)}>
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

export default AddCommentForm