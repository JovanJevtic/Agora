import { authOptions } from "@/app/libs/authOptions";
import { commentCreationFormSchema } from "@/app/libs/validation/form";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export type CommentCreationData = {
    text: string;
    postId: string;
    isReply: boolean;
    parrentCommentId: string;
}

export const POST = async (request: NextRequest) => {
    try {
        const {
            text,
            isReply,
            parrentCommentId,
            postId
        } = (await request.json()) as CommentCreationData

        console.log(text,
            isReply,
            parrentCommentId,
            postId);

        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return NextResponse.json({ message: "Došlo je do greške u prijavi, molimo Vas prijavite se ponovo!" }, { status: 500 })
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
    
            return NextResponse.json({ errors: zodErrors }, { status: 400 });
        }

        const comment = await prisma.comment.create({
            data: {
                text, 
                isReply,
                authorId: session.user.id,
                postId,
                parrentCommentId
            }
        })

        return NextResponse.json({ comment }, { status: 200 });
    } catch (error) {
        console.log(error, 'err');
        return NextResponse.json({ error })
    }
}