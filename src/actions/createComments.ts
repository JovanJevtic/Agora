'use server';
import { commentCreationFormSchema } from "@/app/libs/validation/form";
import { getServerSession } from "next-auth";
import prisma from "@/app/libs/prismadb";
import { Cagliostro } from "next/font/google";
import { authOptions } from "@/app/libs/authOptions";
import { revalidatePath } from "next/cache";

export const createComment = async (postId: string, isReply: boolean, parrentCommentId: string | null, formData: FormData) => {
    try {
        const text = formData.get("text");

        if (!text) {
            return {
                errors: "No text field provided!"
            }
        }

        const session = await getServerSession(authOptions)

        if (!session?.user.id) {
            console.log(session?.user);
            return {
                errors: "Unauthorized!"
            }
        }

        const validateResponse = commentCreationFormSchema.safeParse({
            text,
            // isReply,
            // parrentCommentId,
            // postId
        })

        let zodErrors = {};
        if (!validateResponse.success) {
                validateResponse.error.issues.forEach((issue) => {
                zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
            });
    
            return {
                errors: zodErrors
            }
        }

        const comment = await prisma.comment.create({
            data: {
                text: text as string, 
                isReply,
                authorId: session.user.id,
                postId,
                parrentCommentId
            }
        })

        revalidatePath(`/post/[slug]`)
    } catch (error) {
        return {
            errors: error
        }
    }
}