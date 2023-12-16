import { NextRequest, NextResponse } from 'next/server';
import { postCreationFormSchema } from '@/app/libs/validation/form'
import prisma from '@/app/libs/prismadb';
import { authOptions } from '@/app/libs/authOptions';
import { getServerSession } from 'next-auth';

export type PostCreationData = {
    title: string;
    subtitle: string;
    body: string;
    image: string;
    slug: string;
    categoryId: string;
    subcategoryId: string;
    positionPrimary: boolean;
    positionSecondary: boolean;
    fotoIzvor: string;
    authorId: string;
}

export const POST = async (request: NextRequest) => {
    try {
        const {
            title,
            subtitle,
            body,
            categoryId,
            fotoIzvor,
            image,
            positionPrimary,
            positionSecondary,
            slug,
            subcategoryId,
            // authorId
        } = (await request.json()) as PostCreationData;
    
        const session = await getServerSession(authOptions)
    
        const postData = {
            title,
            subtitle,
            body,
            categoryId,
            fotoIzvor,
            image,
            positionPrimary,
            positionSecondary,
            slug,
            subcategoryId,
            // authorId
            authorId: session?.user.id as string
        }
    
        const validateResponse = postCreationFormSchema.safeParse({ 
            title,
            subtitle,
            body,
            categoryId,
            fotoIzvor,
            image,
            positionPrimary,
            positionSecondary,
            slug,
            subcategoryId
        })

        const slugEquieped = await prisma.post.findUnique({
            where: {
                slug: slug
            }
        })

        if (slugEquieped) { 
            console.log('ekvipovan');
            return NextResponse.json({ errors: { title: "Članak sa ovim naslovom već postoji!" }}, { status: 400 })
        }
    
        let zodErrors = {};
        if (!validateResponse.success) {
                validateResponse.error.issues.forEach((issue) => {
                zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
            });
    
            return NextResponse.json({ errors: zodErrors }, { status: 400 });
        }
    
        const post = await prisma.post.create({
            data: {
                ...postData,
            }
        })
    
        return NextResponse.json({ post }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error })
    }
}

export const PUT = async (request: NextRequest) => {
    try {
        const {
            title,
            subtitle,
            body,
            categoryId,
            fotoIzvor,
            image,
            positionPrimary,
            positionSecondary,
            slug,
            subcategoryId,
        } = (await request.json()) as PostCreationData;
    
        const url = new URL(request.url)
        const id = url.searchParams.get("id");
        if (!id) return NextResponse.json({ status: 500 });
    
        const postData = {
            title,
            subtitle,
            body,
            categoryId,
            fotoIzvor,
            image,
            positionPrimary,
            positionSecondary,
            slug,
            subcategoryId,
        }
    
        const validateResponse = postCreationFormSchema.safeParse({ 
            title,
            subtitle,
            body,
            categoryId,
            fotoIzvor,
            image,
            positionPrimary,
            positionSecondary,
            slug,
            subcategoryId
        })

        const slugEquieped = await prisma.post.findUnique({
            where: {
                slug: slug
            }
        })

        if (slugEquieped) { 
            console.log('ekvipovan');
            return NextResponse.json({ errors: { title: "Članak sa ovim naslovom već postoji!" }}, { status: 400 })
        }

        let zodErrors = {};
        if (!validateResponse.success) {
                validateResponse.error.issues.forEach((issue) => {
                zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
            });
    
            return NextResponse.json({ errors: zodErrors }, { status: 400 });
        }

        const post = await prisma.post.update({
            where: {
                id: id
            }, 
            data: {
                ...postData
            }
        })
    
        return NextResponse.json({ post }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error })
    }
}