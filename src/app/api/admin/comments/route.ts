import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export const DELETE = async (request: NextRequest) => {
    try {
        const {
            commentId
        } = await request.json();

        console.log('dasdasdas');

        if (!commentId) return NextResponse.json({ status: 400 });

        // const fatherComments = await prisma.comment.findFirst({
        //     where: {
        //         replies: {
        //             some: {
        //                 id: commentId
        //             }
        //         }
        //     },
        //     include: {
        //         replies: true
        //     }
        // })

        // const a = await prisma.comment.update({
        //     data: {
        //         replies: {
        //             disconnect: fatherComments?.replies.map((e) => {
        //                 return { id: e.id }
        //             }),
        //         }
        //     }
        // })

        const deletedComment = await prisma.comment.delete({
            where: {
                id: commentId
            },
        })

        return NextResponse.json({ msg: `Successfully deleted` }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}