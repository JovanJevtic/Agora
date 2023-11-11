import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";

export const GET = async (request: NextRequest) => {
    try {
        
        const url = new URL(request.url)
        const slug = url.searchParams.get("slug");
        if (!slug) return NextResponse.json({ status: 500 });

        const post = await prisma.post.findUnique({ 
            where: { 
                id: slug
            } 
        });
        if (!post) return NextResponse.json({ status: 500 });

        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}