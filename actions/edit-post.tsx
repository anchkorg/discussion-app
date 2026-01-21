'use server';
import type { Post } from  '@prisma/client';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {auth} from "@/auth";
import {db } from  '@/db';
import paths from '@/paths';

interface PostEditFormState {
  errors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
}


const EditPostSchema = z.object({
    title: z.string().superRefine((val, ctx) => {
        if (val.length < 3) {
            ctx.addIssue({
                code: "custom",
                message: "Too small: expected string to have >=3 characters",
            });
        }
    }),
    content: z.string().min(10),
});

interface EditPostFormState {
    errors: {
        title?: string[];
        content?: string[];
        _form?: string[];
    }
}

export async function editPost(
    postId : string ,
    slug: string,
    formState: EditPostFormState,
    formData: FormData): Promise<EditPostFormState>{
        const result = EditPostSchema.safeParse({
            title: formData.get('title'),
            content: formData.get('content'),
    });

    const topic = await db.topic.findFirst({
        where: { slug }
    });

    if (!topic){
        return {
            errors: {
                _form: ['Cannot find topic']
            }
        }
    };

    if (!result.success) {
        const { fieldErrors } = z.flattenError(result.error);
        return {
            errors: fieldErrors
        }
    }

    const session = await auth();
    if (!session || !session.user || !session.user.id){
        return {
            errors: {
                _form: ['You must be signed in to do this.'],
            }
        };
    }

    let post: Post;

    try {
        post = await db.post.update({
            where: { id: postId },
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id!,
                topicId: topic?.id!,
            }
        });
        console.log(post);
    } catch (err:unknown){
        if (err instanceof Error){
            return{
                errors: {
                    _form: [err.message]
                }
            }
        } else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                }
            }
        }
    }

    revalidatePath(paths.topicShowPath(slug));
    redirect(paths.postShowPath(topic?.slug!,post.id));

    //revalidate to Post Show page
}