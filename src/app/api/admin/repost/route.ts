import { NextRequest, NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';

export const PUT = async (request: NextRequest) => {
    try {
        const {
            postId
        } = await request.json();

        const post = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                archived: false
            }
        })
        
        return NextResponse.json({ post }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ status: 500 })
    }
}