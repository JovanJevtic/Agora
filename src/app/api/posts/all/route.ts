import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";

export const GET = async (request: NextRequest) => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                archived: false
            }
        });
        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}