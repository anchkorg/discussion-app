import type { Topic } from '@prisma/client';
import { db } from '@/db';

export type TopicWithData =  (
    Topic & {
        user: { name: string | null };
        _count: { comments: number }
    }
)

export function fetchTopic() {
    return db.topic.findMany();
}
