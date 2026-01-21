'use server';

import type { Topic } from  '@prisma/client';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {auth} from "@/auth";
import {db } from  '@/db';
import paths from '@/paths';

const createTopicSchema = z.object({
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

interface CreateTopicFormState {
    errors: {
        name?: string[];
        description?: string[];
        _form?: string[];
    }
}

export async function createTopic(
    formState: CreateTopicFormState,
    formData: FormData): Promise<CreateTopicFormState>{
        const result = createTopicSchema.safeParse({
            name: formData.get('name'),
            description: formData.get('description')
    });

    if (!result.success) {
        const { fieldErrors } = z.flattenError(result.error);
        return {
            errors: fieldErrors
        }
    }

    const session = await auth();
    if (!session || !session.user){
        return {
            errors: {
                _form: ['You must be signed in to do this.'],
            }
        };
    }

    let topic: Topic;

    try {
        topic = await db.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description,
                userId: session.user.id!,
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
    redirect(paths.topicShowPath(topic.slug));
}