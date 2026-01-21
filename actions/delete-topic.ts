'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {auth} from "@/auth";
import {db } from  '@/db';


interface DeleteTopicFormState {
    errors: {
        topic?: string[];
        _form?: string[];
    }
}

export async function deleteTopic(
    slug: string,
    formState: DeleteTopicFormState,
    formData: FormData):Promise<DeleteTopicFormState>{

    const session = await auth();
    if (!session || !session.user){
        return {
            errors: {
                _form: ['You must be signed in to do this.'],
            }
        };
    }

  //  const topicId = formData.get('topicId') as string;
    const topic = await db.topic.findFirst({
        where: { slug }
    });

    if (!topic) {
        return {
            errors: { topic: ['topic is missing.'] }
        };
    }

    try {
        // 2. 修正 Prisma 刪除語法，確保 where 條件正確
        await db.topic.delete({
            where: {
                id: topic.id, // 請確認你的 Prisma Schema 中欄位名稱是 id 還是 topicId
            }
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return { errors: { _form: [err.message] } };
        }
        return { errors: { _form: ['Something went wrong'] } };
    }

    revalidatePath("/");
    redirect("/");
}