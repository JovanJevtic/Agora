import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export const dynamic = 'force-dynamic'
export const GET = async (request: NextRequest) => {
  const dynamic = 'force-dynamic'
  try {
    const postPrimary = await prisma.post.findFirst({
      where: {
        positionPrimary: true,
        archived: false
      },
      take: 1,
      orderBy: { createdAt: "desc" },
    });

    const postsSecondary = await prisma.post.findMany({
      where: {
        positionSecondary: true,
        NOT: {
          id: postPrimary?.id || ''
        },
        archived: false
      },
      take: 4,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ primary: postPrimary, secondary: postsSecondary }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};