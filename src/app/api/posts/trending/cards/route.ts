import { NextRequest, NextResponse } from "next/server";
import  prisma from '@/app/libs/prismadb'

export const GET = async (request: NextRequest) => {
    try {
        const url = new URL(request.url);
        const type = url.searchParams.get("type");
        const categoryId = url.searchParams.get("categoryId")
        const subcategoryId = url.searchParams.get("subcategoryId")
        const postId = url.searchParams.get("postId");

        if (!type || !postId) return NextResponse.json({ status: 500 });

        if (type === "category" && categoryId) {
            const posts = await prisma.post.findMany({ 
                where: { 
                    categoryId: categoryId,
                    NOT: {
                        id: postId
                    }
                }, 
                orderBy: { createdAt: 'desc'  }, 
                take: 5
            });

            return NextResponse.json(posts);
        } else if (type === "subcategory" && subcategoryId) {
            const posts = await prisma.post.findMany({ 
                where: { 
                    subcategoryId: subcategoryId,
                    NOT: {
                        id: postId
                    }
                }, 
                orderBy: { createdAt: 'desc'  
            }, take: 5 });
            
            return NextResponse.json(posts);
        } else {
            return NextResponse.json({ status: 500 });
        }

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}