import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export const GET = async (request: NextRequest) => {
    try {
        
        const url = new URL(request.url)
        const id = url.searchParams.get("id");
        const slug = url.searchParams.get("slug");
        if (!id && !slug) return NextResponse.json({ status: 500 });

        if (id) {
            const post = await prisma.post.findUnique({ 
                where: { 
                    id: id,
                    // archived: false
                },
                include: {
                    comments: {
                        orderBy: {
                            createdAt: "desc"
                        }
                    }
                }
            });
            if (!post) return NextResponse.json({ status: 500 });
    
            return NextResponse.json(post, { status: 200 });
        }

        if (slug) {
            const post = await prisma.post.findUnique({ 
                where: { 
                    slug: slug,
                    // archived: false
                },
                include: {
                    comments: {
                        where: {
                            isReply: false
                        },
                        include: {
                            author: true,
                            replies: {
                                include: {
                                    author: true
                                }
                            }
                        }
                    }
                }
            });
            if (!post) return NextResponse.json({ status: 500 });
    
            return NextResponse.json(post, { status: 200 });
        }

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}