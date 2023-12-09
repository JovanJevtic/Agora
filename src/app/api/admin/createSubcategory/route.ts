import { NextRequest, NextResponse } from 'next/server';
import { postCreationFormSchema, subcategoryCreationFormSchema } from '@/app/libs/validation/form'
import prisma from '@/app/libs/prismadb';
import { authOptions } from '@/app/libs/authOptions';
import { getServerSession } from 'next-auth';

export type SubcategoryCreationData = {
    categoryId: string;
    name: string;
    colorHex: string;
}

export const POST = async (request: NextRequest) => {
    try {
        const {
            categoryId,
            colorHex,
            name
        } = (await request.json()) as SubcategoryCreationData;
    
        const postData = {
            categoryId,
            colorHex,
            name
        }
    
        const validateResponse = subcategoryCreationFormSchema.safeParse({ 
            categoryId,
            colorHex,
            name
        })
    
        let zodErrors = {};
        if (!validateResponse.success) {
                validateResponse.error.issues.forEach((issue) => {
                zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
            });
    
            return NextResponse.json({ errors: zodErrors }, { status: 400 });
        }
    
        const subcategory = await prisma.subcategory.create({
            data: {
                ...postData,
            }
        })

        return NextResponse.json({ subcategory }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error })
    }
}

export const DELETE = async (request: NextRequest) => {
    try {
        const {
            subcategoryId
        } = await request.json();

        if (!subcategoryId) return NextResponse.json({ status: 400 });

        const deletedSub = await prisma.subcategory.delete({
            where: {
                id: subcategoryId
            }
        })

        return NextResponse.json({ msg: `Successfully deleted` }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error })
    }
}

// export const PUT = async (request: NextRequest) => {
//     try {
//         const {
//             title,
//             subtitle,
//             body,
//             categoryId,
//             fotoIzvor,
//             image,
//             positionPrimary,
//             positionSecondary,
//             slug,
//             subcategoryId,
//         } = (await request.json()) as PostCreationData;
    
//         const url = new URL(request.url)
//         const id = url.searchParams.get("id");
//         if (!id) return NextResponse.json({ status: 500 });
    
//         const postData = {
//             title,
//             subtitle,
//             body,
//             categoryId,
//             fotoIzvor,
//             image,
//             positionPrimary,
//             positionSecondary,
//             slug,
//             subcategoryId,
//         }
    
//         const validateResponse = postCreationFormSchema.safeParse({ 
//             title,
//             subtitle,
//             body,
//             categoryId,
//             fotoIzvor,
//             image,
//             positionPrimary,
//             positionSecondary,
//             slug,
//             subcategoryId
//         })
    
//         let zodErrors = {};
//         if (!validateResponse.success) {
//                 validateResponse.error.issues.forEach((issue) => {
//                 zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
//             });
    
//             return NextResponse.json({ errors: zodErrors }, { status: 400 });
//         }
    
//         const post = await prisma.post.update({
//             where: {
//                 id: id
//             }, 
//             data: {
//                 ...postData
//             }
//         })
    
//         return NextResponse.json({ post }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ error })
//     }
// }

