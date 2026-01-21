"use server";
 import { redirect } from 'next/navigation';
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";


interface CommentDeleteFormState {
    errors: {
        content?: string[];
        _form?: string[];
    };
    success?: boolean;
}

export async function deleteComment(
    { commentId }: { commentId: string },
    formState: CommentDeleteFormState,
    formData: FormData
): Promise<CommentDeleteFormState> {

    const session = await auth();
    if (!session || !session.user || !session.user.id) {
    return {
        errors: {
            _form: ["You must sign in to do this."],
        },
        };
    }

    const comment = await db.comment.findUnique({
        where: { id: commentId },
        include: { post: true },
    });

    if (!comment) {
        return { errors: { _form: ["Comment not found"] } };
    }

    const post = await db.post.findUnique({
        where: { id: comment.postId },
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


    if (!topicSlug) {
        return {
        errors: {
            _form: ["Failed to revalidate topic"],
        },
        };
    }

    try {
        await db.comment.delete({
        where: { id: commentId },
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
    redirect(paths.postShowPath(topicSlug!,post.id));
}
