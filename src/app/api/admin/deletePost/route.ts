import { NextRequest, NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';

export const DELETE = async (request: NextRequest) => {
    try {
        
        const url = new URL(request.url)
        const slug = url.searchParams.get("id");
        if (!slug) return NextResponse.json({ status: 500 });

        const post = await prisma.post.delete({ 
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