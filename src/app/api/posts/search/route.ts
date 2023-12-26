import {
    NextRequest, NextResponse
} from 'next/server';
import prisma from '@/app/libs/prismadb';

export const GET = async (request: NextRequest) => {
    try {
        const url = new URL(request.url)
        const text = url.searchParams.get("text");

        if (!text) return NextResponse.json({ posts: [] });

        const posts = await prisma.post.findMany({
            where: {
                OR: [{
                    title: {
                        contains: text
                    },
                    subtitle: {
                        contains: text
                    }
                }]
            }, 
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json({ posts: posts }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}