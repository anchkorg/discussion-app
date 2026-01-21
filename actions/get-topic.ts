'use server'

import { db } from "@/db";

export async function getTopic(slug: string,){
    return await db.topic.findFirst({
        where: { slug },
        select: {
            slug: true,
            description: true
        }
    });
}