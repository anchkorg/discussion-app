'use server'

import { db } from "@/db";

export async function getComment(commentId:string){
    return await db.comment.findUnique({
        where: { id: commentId },
        include: { post: true },
    });
}