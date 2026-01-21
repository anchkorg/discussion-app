
import PostCreateForm from "@/components/posts/post-create-form";
import PostList from '@/components/posts/post-list';
import TopicDeleteForm from "@/components/topics/topic-delete-form";
import { fetchPostByTopicSlug  } from '@/db/queries/posts';
import { auth } from "@/auth"; // 或是您設定 NextAuth 的路徑
import { db } from "@/db";
import TopicEditForm from "@/components/topics/topic-edit-form";

interface TopicShowPageProps{
    params: Promise<{
        slug: string;
    }>;
}

export default async function TopicShowPage({params}:TopicShowPageProps){
    const { slug } = await params;
    const session = await auth(); // 獲取目前的登入資訊

    const topic = await db.topic.findFirst({
        where: { slug },
    });

    if (!topic) return <div>Topic not found</div>;

    const isOwner = session?.user?.id === topic.userId;

    return (<div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-3">
            <h1 className="text-2xl font-bold mb-2">
                {slug}
            </h1>
            <PostList fetchData={()=>fetchPostByTopicSlug(slug)} />
        </div>
        <div className="flex flex-col gap-4">
            <PostCreateForm slug={slug} />
            {isOwner && <TopicEditForm slug={slug} />}
            {isOwner && <TopicDeleteForm slug={slug} />}
        </div>
    </div>);
}