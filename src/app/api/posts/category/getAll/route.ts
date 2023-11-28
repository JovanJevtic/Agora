import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export const GET = async (request: NextRequest) => {
    try {
        const categorys = await prisma.category.findMany({ 
            
        });
        if (!categorys) return NextResponse.json({ status: 500 });

        return NextResponse.json( categorys );
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}