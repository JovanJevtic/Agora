import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export const GET = async (request: NextRequest) => {
    try {
        const posts = await prisma.post.findMany({ 
            where: {
                // AND: [
                //     { categoryId: 'clop313zk0000ju089a48am77'},
                //     { OR: [
                //         { position1: true }, { position2: true }, { position3: true }, { position4: true }, { position5: true }
                //     ] }
                // ]
                // categoryId: 'clop346my0000r5dwlcpl9uf4'
                OR: [
                    { position1: true }, { position2: true }, { position3: true }, { position4: true }, { position5: true }
                ] 
            }, take: 5, orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(posts, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}