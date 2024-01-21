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
        return NextResponse.json({ error })
    }
}

export const GET = async (request: NextRequest) => {
    try {
        const url = new URL(request.url)
        const id = url.searchParams.get("id");
        if (!id) return NextResponse.json({ status: 500 });

        const comment = await prisma.comment.findUnique({
            where: {
                id
            },
            include: {
                replies: {
                    orderBy: {
                        createdAt: "desc"
                    },
                    include: {
                        author: true
                    }
                }
            }
        })

        return NextResponse.json(comment)
    } catch (error) {
        console.log(error, 'blaa <<<<<<<<<==');
        return NextResponse.error();
    }
}