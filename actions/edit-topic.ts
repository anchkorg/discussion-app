'use server';

import type { Topic } from  '@prisma/client';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {auth} from "@/auth";
import {db } from  '@/db';
import paths from '@/paths';

const editTopicSchema = z.object({
    name: z.string().superRefine((val, ctx) => {
        if (val.length < 3) {
            ctx.addIssue({
                code: "custom",
                message: "Too small: expected string to have >=3 characters",
            });
        }
        if (!/^[a-zA-Z-]+$/.test(val)) {
            ctx.addIssue({
                code: "custom",
                message: "Must be lowercase letter or dashes without spaces",
            });
        }
    }),
    description: z.string().min(10),
});

interface EditTopicFormState {
    errors: {
        name?: string[];
        description?: string[];
        _form?: string[];
        topic?: string[];
    }
}

export async function editTopic(
    slug: string,
    formState: EditTopicFormState,
    formData: FormData): Promise<EditTopicFormState>{
        const result = editTopicSchema.safeParse({
            name: formData.get('name'),
            description: formData.get('description')
    });

    if (!result.success) {
        const { fieldErrors } = z.flattenError(result.error);
        return {
            errors: fieldErrors
        }
    }

    const currentTopic = await db.topic.findFirst({
        where: { slug }
    });

    if (!currentTopic) {
        return {
            errors: { topic: ['currentTopic is missing.'] }
        };
    }


    const session = await auth();
    if (!session || !session.user){
        return {
            errors: {
                _form: ['You must be signed in to do this.'],
            }
        };
    } else if (currentTopic.userId != session.user.id!){
        return {
            errors: {
                _form: ['You are not the topic owner.  You cannot update the topic information.'],
            }
        };
    }

    let topic: Topic;

    try {
        topic = await db.topic.update({
            where: {
                id: currentTopic.id,
            },
            data: {
                slug: result.data.name,
                description: result.data.description,
            }
        })
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

    revalidatePath("/");
    revalidatePath(topic.slug);
    redirect(paths.topicShowPath(topic.slug));
}