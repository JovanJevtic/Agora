import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export const GET = async (request: NextRequest) => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                archived: false
            }
        });
        return NextResponse.json(posts.map(post => post.slug), { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}