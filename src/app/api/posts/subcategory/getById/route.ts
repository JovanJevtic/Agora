import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";

export const GET = async (request: NextRequest) => {
    try {
        const url = new URL(request.url)
        const id = url.searchParams.get("id");
        if (!id) return NextResponse.json({ status: 500 });

        const subcategory = await prisma.subcategory.findUnique({ 
            where: { 
                id: id
            } 
        });
        if (!subcategory) return NextResponse.json({ status: 500 });

        return NextResponse.json({ subcategory });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}