import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export const GET = async (request: NextRequest) => {
    try {
        const subcategorys = await prisma.subcategory.findMany({ 
            
        });
        if (!subcategorys) return NextResponse.json({ status: 500 });

        return NextResponse.json( subcategorys );
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}