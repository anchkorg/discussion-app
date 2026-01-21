import Link from 'next/link';
import paths from '@/paths';
import { type TopicWithData } from '@/db/queries/posts';

interface TopicListProps {
    fetchData: () => Promise<TopicWithData[]>
}

export default async function TopicTopList({ fetchData}: TopicListProps) {
    const topics = await fetchData();
    console.log("topics data ",topics);


    const renderedPosts = topics.map((topic) => {
        const topicSlug = topic.slug;

        if (!topicSlug) {
        throw new Error('Need a slug to link to a topic');
        }

        return (
        <div key={topic.id} className="border rounded p-2">
            <Link href={paths.topicShowPath(topicSlug)}>
            <h2 className="text-lg font-bold">{topic.slug}</h2>
            <h3 className="text-lg font-bold">{topic.description}</h3>
            <div className="flex flex-row gap-8">
                <p className="text-xs text-gray-400">{topic.totalPosts} Posts with {topic.totalComments} comments</p>
            </div>
            </Link>
        </div>
        );
    });


    return <div className="space-y-2">{renderedPosts}</div>;
}
