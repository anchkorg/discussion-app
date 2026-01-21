"use server";
 
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";

const editCommentSchema = z.object({
  content: z.string().min(3),
});

interface EditCommentFormState {
  errors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function editComment(
  { postId, parentId, commentId }: { postId: string; parentId?: string; commentId?: string },
  formState: EditCommentFormState,
  formData: FormData
): Promise<EditCommentFormState> {
  const result = editCommentSchema.safeParse({
    content: formData.get("content"),
  });

  if (!result.success) {
    const { fieldErrors } = z.flattenError(result.error);
    console.log("edit-Post.ts", fieldErrors);
    return {
        errors: fieldErrors
    }
  }

  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ["You must sign in to do this."],
      },
    };
  }

  try {
    await db.comment.update({
        where:{ id: commentId},
        data: {
            content: result.data.content,
        },
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong..."],
        },
      };
    }
  }

  const topic = await db.topic.findFirst({
    where: { posts: { some: { id: postId } } },
  });

  if (!topic) {
    return {
      errors: {
        _form: ["Failed to revalidate topic"],
      },
    };
  }

  revalidatePath(paths.postShowPath(topic.slug, postId));
  return {
    errors: {},
    success: true,
  };
}
