import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export const GET = async (request: NextRequest) => {
    try {
        const url = new URL(request.url)
        const categoryId = url.searchParams.get("categoryId");
        if (!categoryId) return NextResponse.json({ status: 500 });

        const subcategorys = await prisma.subcategory.findMany({ 
            where: { 
                categoryId: categoryId
            },
        });

        return NextResponse.json(subcategorys);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}