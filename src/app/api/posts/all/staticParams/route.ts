import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export const GET = async (request: NextRequest) => {
    try {
        const posts = await prisma.post.findMany({});
        return NextResponse.json(posts.map(post => post.id), { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}