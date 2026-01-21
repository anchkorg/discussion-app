'use server'

import { db } from "@/db";

export async function getPost(postId:string){
    return await db.post.findUnique({
        where: { id: postId },
        include: { topic: true },
    });
}