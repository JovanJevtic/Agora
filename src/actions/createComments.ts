"use server";
import { commentCreationFormSchema } from "@/app/libs/validation/form";
import { getServerSession } from "next-auth";
import prisma from "@/app/libs/prismadb";
import { Cagliostro } from "next/font/google";
import { authOptions } from "@/app/libs/authOptions";
import { revalidatePath, revalidateTag } from "next/cache";

export const createComment = async (
  postId: string,
  isReply: boolean,
  parrentCommentId: string | null,
  postSlug: string,
  formData: FormData
) => {
  try {
    const text = formData.get("text");

    if (!text) {
      throw new Error("No text field provided!");
    }

    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      throw new Error("Unauthorized!");
    }

    const validateResponse = commentCreationFormSchema.safeParse({
      text,
    });

    let zodErrors = {};
    if (!validateResponse.success) {
      validateResponse.error.issues.forEach((issue) => {
        zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
      });

      return {
        errors: zodErrors,
      };
    }

    const comment = await prisma.comment.create({
      data: {
        text: text as string,
        isReply,
        authorId: session.user.id,
        postId,
        parrentCommentId,
      },
    });
    // revalidatePath(`/post/${postSlug}`)
    // revalidatePath('/post/[slug]')
    // revalidatePath('/post/[slug]/page', "page")
    // revalidateTag('post')
    return comment;
  } catch (error: any) {
    // revalidatePath('/post/[slug]')
    // console.log('errrrrr');
    // revalidatePath('/post/[slug]/page', "page")
    // revalidateTag('post')
    throw new Error(error);
  } finally {
    revalidatePath("/post/[slug]");
  }
};
