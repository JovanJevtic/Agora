import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";

export const GET = async (request: NextRequest) => {
    try {
        const url = new URL(request.url)
        const id = url.searchParams.get("id");
        if (!id) return NextResponse.json({ status: 500 });

        const subcategorys = await prisma.subcategory.findMany({ 
            where: { 
                categoryId: id
            } 
        });
        if (!subcategorys) return NextResponse.json({ status: 500 });

        return NextResponse.json( subcategorys );
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}