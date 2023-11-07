import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export const GET = async (request: NextRequest) => {
    try {
        const posts = await prisma.post.findMany({ 
            where: {
                AND: [
                    { categoryId: 'clomrvf600000r5iwe7vw9v9u'},
                    { OR: [
                        { position1: true }, { position2: true }, { position3: true }, { position4: true }, { position5: true }
                    ] }
                ]
            }
        })
        return NextResponse.json(posts, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}