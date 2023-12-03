import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export const revalidate = 1
export const GET = async (request: NextRequest) => {
  try {
    const postsSecondary = await prisma.post.findMany({
      where: {
        positionSecondary: true
      },
      take: 4,
      orderBy: { createdAt: "desc" },
    });
    const postPrimary = await prisma.post.findFirst({
      where: {
        positionPrimary: true
      },
      take: 1,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json([...postsSecondary, postPrimary], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
