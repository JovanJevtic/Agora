import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";

export const GET = async (request: NextRequest) => {
    try {
        
        const url = new URL(request.url)
        const name = url.searchParams.get("name");
        if (!name) return NextResponse.json({ status: 500 });

        const category = await prisma.category.findUnique({ 
            where: { 
                name: name
            } 
        });
        if (!category) return NextResponse.json({ status: 500 });

        const posts = await prisma.post.findMany({ where: { categoryId: category?.id }, orderBy: { createdAt: 'desc'  }, take: 3 })
        return NextResponse.json({ posts: posts });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}