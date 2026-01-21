"use server";
 import { redirect } from 'next/navigation';
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";


interface PostDeleteFormState {
  errors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function deletePost(
  { postId }: { postId: string },
  formState: PostDeleteFormState,
  formData: FormData
): Promise<PostDeleteFormState> {

  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ["You must sign in to do this."],
      },
    };
  }

  const post = await db.post.findUnique({
    where: { id: postId },
    include: { topic: true },
  });

if (!post) {
    return { errors: { _form: ["Post not found"] } };
  }

  const topicSlug = post.topic.slug;


  if (!topicSlug) {
    return {
      errors: {
        _form: ["Failed to revalidate topic"],
      },
    };
  }

  try {
    await db.post.delete({
      where: { id: postId },
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

  revalidatePath(paths.topicShowPath(topicSlug));
    redirect(paths.topicShowPath(topicSlug));
  return {
    errors: {},
    success: true,
  };
}
