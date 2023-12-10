import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";

export const dynamic = 'force-dynamic'
export const GET = async (request: NextRequest) => {
    const dynamic = 'force-dynamic'
    try {
        const posts = await prisma.post.findMany({
            where: {
                archived: true
            }
        });
        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}