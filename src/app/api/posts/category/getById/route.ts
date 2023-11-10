import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export const GET = async (request: NextRequest) => {
    try {
        const url = new URL(request.url)
        const id = url.searchParams.get("id");
        if (!id) return NextResponse.json({ status: 500 });

        const category = await prisma.category.findUnique({ 
            where: { 
                id: id
            } 
        });
        if (!category) return NextResponse.json({ status: 500 });

        return NextResponse.json({ category });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}