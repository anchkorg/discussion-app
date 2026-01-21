import type { Topic, Post } from '@prisma/client';
import { db } from '@/db';

export type PostWithData =  (
    Post & {
        topic: { slug: string };
        user: { name: string | null };
        _count: { comments: number }
    }
)

export type TopicWithData =  (
    Topic & {
        user: { 
            name: string | null ;
            image: string | null ;
        };
        totalComments: number;
        totalPosts: number
    }
)

export async function getTopTopicsWithMostComments() {
    const topicsWithCommentCount = await db.topic.findMany({
        include: {
        posts: {
            include: {
            _count: {
                select: { comments: true }
            }
            }
        },
        user: {
            select: {
            name: true,
            image: true
            }
        }
        }
    });

    // Calculate total comments for each topic
    const topicsWithTotalComments = topicsWithCommentCount.map(topic => {
        const totalComments = topic.posts.reduce(
        (sum, post) => sum + post._count.comments,
        0
        );
        return {
        id: topic.id,
        slug: topic.slug,
        description: topic.description,
        createdAt: topic.createdAt,
        updatedAt: topic.updatedAt,
        userId: topic.userId,
        user: topic.user,
        totalComments: totalComments,
        totalPosts: topic.posts.length
        };
    });

  // Sort by total comments (descending) and return top N
  return topicsWithTotalComments
    .sort((a, b) => b.totalComments - a.totalComments)
    .slice(0, 5);
}

export function fetchAllPosts():Promise<PostWithData[]>{
     return db.post.findMany({
        orderBy: [
            { comments: {
                _count:"desc"
            }}
        ],
        include: {
            topic: { select: {slug: true}},
            user: { select: { name: true, image: true}},
            _count: { select: { comments: true}}
        },
    })
}

export function fetchPostByTopicSlug(slug: string):Promise<PostWithData[]> {
    return db.post.findMany({
        where: { topic: { slug }},
        include: {
            topic: {select: { slug: true}},
            user: { select: { name: true}},
            _count: {select: { comments: true}},
        }
    })
}

export function fetchTopPosts():Promise<PostWithData[]>{
    return db.post.findMany({
        orderBy: [
            { comments: {
                _count:"desc"
            }}
        ],
        include: {
            topic: { select: {slug: true}},
            user: { select: { name: true, image: true}},
            _count: { select: { comments: true}}
        },
        take: 5,
    })
}

export function fetchPostsBySearchTerm(term: string): Promise<PostWithData[]>{
    return db.post.findMany({
        include: {
            topic: { select: {slug:true}},
            user: { select: { name: true, image: true}},
            _count: { select: { comments: true}}
        },
        where: {
            OR: [
                { title: { contains: term }}, { content: { contains: term}}
            ]
        }
    })
}